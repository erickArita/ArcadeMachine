using ArcadeMachine.Api.Game.Responses;
using ArcadeMachine.Core.Partida.Models;

namespace ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;

public interface IPartidaRepositorio
{
    Task<Domain.Entities.Partida> CrearPartida(PartidaTemporal partidaTemporal);
    Task<List<UserHistory>> ObtenerUltimasPartidas(Guid juegoId, string jugadorId);
    Task<List<MundialTop>> ObtenerMejoresJugadoresPorJuego(Guid juegoId);
}