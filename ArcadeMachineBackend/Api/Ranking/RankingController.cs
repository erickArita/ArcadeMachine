using ArcadeMachine.Api.Game.Responses;
using ArcadeMachine.Core.Partida;
using ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;
using Microsoft.AspNetCore.Mvc;

namespace ArcadeMachine.Api.Ranking;

[Route("api/[controller]/[action]")]
[ApiController]
public class RankingController : ControllerBase
{
    private readonly IPartidaService _partidaService;
    private readonly IPartidaRepositorio _partidaRepositorio;
    // inyectar el servicio de partidas y devolver los 2 rankings
    // crear recors de respuesta para los 2 rankings
    // uno recibe el id del juego para trael el ranking de ese juego
    // y elo tro recibe el id del jugador y del juego para traer el ranking de ese jugador

    public RankingController(IPartidaService partidaService, IPartidaRepositorio partidaRepositorio)
    {
        _partidaService = partidaService;
        _partidaRepositorio = partidaRepositorio;
    }
    
    [HttpGet]
    public async Task<List<MundialTop>> ObtenerRankingPorJuego([FromQuery] Guid juegoId)
    {
        var ranking = await _partidaRepositorio.ObtenerMejoresJugadoresPorJuego(juegoId);
        return ranking;
    }
    
    [HttpGet]
    public async Task<List<UserHistory>> ObtenerRankingPorJugador([FromQuery] Guid juegoId, [FromQuery] Guid jugadorId)
    {
        var ranking = await _partidaRepositorio.ObtenerUltimasPartidas(juegoId, jugadorId.ToString());
        return ranking;
    }
}