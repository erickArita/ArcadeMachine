using ArcadeMachine.Api.Game.Responses;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Domain.Entities;

namespace ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;

public interface IPartidaRepositorio
{
    Task<Domain.Entities.Partida> CrearPartida(PartidaTemporal partidaTemporal);
    Task<List<UserHistory>> ObtenerUltimasPartidas(Guid juegoId, string jugadorId);
    Task<List<MundialTop>> ObtenerMejoresJugadoresPorJuego(Guid juegoId);
    Task<List<MiniJuego>> ObtenerMiniJuegos();
    Task<MiniJuego> ObtenerMiniJuego(string juegoId);
}