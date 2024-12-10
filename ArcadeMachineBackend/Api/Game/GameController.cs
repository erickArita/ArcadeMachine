using ArcadeMachine.Api.Game.Queries;
using ArcadeMachine.Api.Game.Requests;
using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;
using ArcadeMachine.Core.Partida.Services;
using ArcadeMachine.Core.Partida.Services.PartidaService;
using ArcadeMachine.Core.Partida.Services.PartidaService.Modelos;
using ArcadeMachine.Domain.Entities;
using ArcadeMachine.Infraestructure.Persistence;
using ArcadeMachine.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ArcadeMachine.Api.Game;

[Route("api/[controller]/[action]")]
[ApiController]
[Authorize]
public class GameController : ControllerBase
{
    private readonly IPartidaService _partidaService;
    private readonly IPartidaRepositorio _partidaRepositorio;
    private readonly IHubContext<GameHub> _hubContext;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IChatGptService _chatGptService;

    public GameController(IPartidaService partidaService, IPartidaRepositorio partidaRepositorio,
        IHubContext<GameHub> hubContext,
        UserManager<IdentityUser> userManager,
        AplicationDbContext context,
        IChatGptService chatGptService
    )
    {
        _partidaService = partidaService;
        _partidaRepositorio = partidaRepositorio;
        _hubContext = hubContext;
        _userManager = userManager;
        _chatGptService = chatGptService;
    }


    [HttpGet]
    public async Task<OkResult> Emparejar(
        [FromQuery] Guid userId,
        [FromQuery] Guid juegoId,
        [FromQuery] bool? useIA,
        CancellationToken cancellationToken = default
    )
    {
        var username = User.Identity.Name;
        if (username is null)
        {
            throw new Exception("No se pudo obtener el usuario");
        }

        if (useIA.HasValue && useIA.Value)
        {
            var iauser = await _userManager.FindByNameAsync("IA");
            var partidaIa = _partidaService.EmparejarConIa(userId, username, juegoId, Guid.Parse(iauser.Id));

            await _hubContext.Clients.User(partidaIa.userName1)
                .SendAsync("Match", partidaIa.PartidaId, TipoJugadorEnum.Anfitrion);

            return Ok();
        }

        var partida = _partidaService.Emparejar(userId, username, juegoId);

        if (partida.Emparejada())
        {
            var user1 = partida.userName1;
            var user2 = partida.userName2;
            await _hubContext.Clients.User(user1)
                .SendAsync("Match", partida.PartidaId, TipoJugadorEnum.Anfitrion);
            await _hubContext.Clients.User(user2)
                .SendAsync("Match", partida.PartidaId, TipoJugadorEnum.Invitado);
        }

        return Ok();
    }

    [HttpGet]
    public async Task SincronizarJugada([FromQuery] SincronizarJugadaQuery query)
    {
        var partida = _partidaService.ObtenerPartida(query.PartidaId);
        var contrincante = partida.ObtenerContrincante(query.JugadorId);
        await _hubContext.Clients.User(contrincante).SendAsync("SincronizarJugada", query.Jugada);
    }

    [HttpPut]
    public async Task ValidarGanador([FromBody] ValidarGanadorRequest request)
    {
        var (partidaActualizada, ganador) =
            _partidaService.SumarGanador(request.PartidaId, request.JugadorId, request.Resultado);

        var user = partidaActualizada.ObtenerUserName(request.JugadorId);
        var use2 = partidaActualizada.ObtenerContrincante(request.JugadorId);

        await _hubContext.Clients.Users(user, use2).SendAsync("Score", new
            Dictionary<string, Score>(
                new List<KeyValuePair<string, Score>>
                {
                    new(user, new(partidaActualizada.ResultadoJugador1, ganador == user)),
                    new(use2, new(partidaActualizada.ResultadoJugador2, ganador == use2))
                }
            ));
    }


    [HttpPost]
    public async Task<OkResult> TerminarPartida([FromBody] TerminarPartidaRequest request)
    {
        var partida = _partidaService.TerminarPartida(request.PartidaId);


        if (partida is not null)
        {
            await _partidaRepositorio.CrearPartida(partida);
            await _hubContext.Clients.Users(partida.userName1, partida.userName2).SendAsync("TerminarPartida");
        }

        return Ok();
    }

    [HttpGet]
    public async Task<PartidaTemporal> ObtenerPartida([FromQuery] Guid partidaId)
    {
        var partida = _partidaService.ObtenerPartida(partidaId);
        return partida;
    }

    [HttpGet]
    public async Task<List<MiniJuego>> ObtenerMiniJuegos()
    {
        var miniJuegos = await _partidaRepositorio.ObtenerMiniJuegos();
        return miniJuegos;
    }

    [HttpGet]
    public async Task<MiniJuego> ObtenerMiniJuego([FromQuery] string juegoId)
    {
        var miniJuego = await _partidaRepositorio.ObtenerMiniJuego(juegoId);
        return miniJuego;
    }
}