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
using Microsoft.AspNetCore.Authorization;
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
    private readonly AplicationDbContext _context;

    public GameController(IPartidaService partidaService, IPartidaRepositorio partidaRepositorio,
        IHubContext<GameHub> hubContext,
        UserManager<IdentityUser> userManager,
        AplicationDbContext context
    )
    {
        _partidaService = partidaService;
        _partidaRepositorio = partidaRepositorio;
        _hubContext = hubContext;
        _userManager = userManager;
        _context = context;
    }


    [HttpGet]
    public async Task<OkResult> Emparejar([FromQuery] Guid userId, [FromQuery] Guid juegoId)
    {
        var username = User.Identity.Name;
        if (username is null)
        {
            throw new Exception("No se pudo obtener el usuario");
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
    public async void SincronizarJugada([FromQuery] SincronizarJugadaQuery query)
    {
        var partida = _partidaService.ObtenerPartida(query.PartidaId);
        var contrincante = partida.ObtenerContrincante(query.JugadorId);
        await _hubContext.Clients.User(contrincante).SendAsync("SincronizarJugada", query.Jugada);
    }

    [HttpPut]
    public async void ValidarGanador([FromBody] ValidarGanadorRequest request)
    {
        var partidaActualizada =
            _partidaService.ActualizarPartida(request.PartidaId, request.JugadorId, request.Resultado);
        var user1 = partidaActualizada.userName1;
        var user2 = partidaActualizada.userName2;

        await _hubContext.Clients.Users(user1, user2).SendAsync("Score", partidaActualizada.ResultadoJugador1,
            partidaActualizada.ResultadoJugador2);
    }


    [HttpPost]
    public async Task<Score> TerminarPartida([FromBody] TerminarPartidaRequest request)
    {
        var partida = _partidaService.TerminarPartida(request.PartidaId, request.JugadorId);
        if (!partida.Emparejada())
        {
            await _partidaRepositorio.CrearPartida(partida);
        }

        var score = _partidaService.ObtenerScore(partida);
        return score;
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
    public async Task<MiniJuego> ObtenerMiniJuego([FromQuery] Guid juegoId)
    {
        var miniJuego = await _partidaRepositorio.ObtenerMiniJuego(juegoId);
        return miniJuego;
    }
}