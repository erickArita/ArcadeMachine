using ArcadeMachine.Core.Partida.Models;

namespace ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;

public interface IPartidaRepositorio
{
    Task<Domain.Entities.Partida> CrearPartida(PartidaTemporal partidaTemporal);
    Task<List<Domain.Entities.Partida>> ObtenerUltimasPartidas(string usuarioId);
    Task<List<Domain.Entities.Partida>> ObtenerMejoresJugadoresPorJuego(Guid juegoId);
}