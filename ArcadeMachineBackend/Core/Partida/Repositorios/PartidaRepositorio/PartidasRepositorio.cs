using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;

public class PartidasRepositorio : IPartidaRepositorio
{
    private readonly AplicationDbContext _appContext;

    public PartidasRepositorio(AplicationDbContext appContext)
    {
        _appContext = appContext;
    }

    // clase para crear una partida
    public async Task<Domain.Entities.Partida> CrearPartida(PartidaTemporal partidaTemporal)
    {
        var partida = new Domain.Entities.Partida()
        {
            juegoId = partidaTemporal.MinijuegoId,
            usuario1Id = partidaTemporal.JugadorId1.ToString(),
            usuario2Id = partidaTemporal.JugadorId2.ToString(),
            puntajeUsuario1 = partidaTemporal.ResultadoJugador1,
            puntajeUsuario2 = partidaTemporal.ResultadoJugador2
        };
        _appContext.Partidas.Add(partida);
        await _appContext.SaveChangesAsync();
        return partida;
    }

    //traer las ultimas 10 partidas de un usario
    public async Task<List<Domain.Entities.Partida>> ObtenerUltimasPartidas(string usuarioId)
    {
        var partidas = await _appContext.Partidas
            .Where(p => p.usuario1Id == usuarioId || p.usuario2Id == usuarioId)
            .OrderByDescending(p => p.Id)
            .Take(10)
            .ToListAsync();
        return partidas;
    }
    // traer los mejores 10 jugadores por juego
    public async Task<List<Domain.Entities.Partida>> ObtenerMejoresJugadoresPorJuego(Guid juegoId)
    {
        var partidas = await _appContext.Partidas
            .Where(p => p.juegoId == juegoId)
            .OrderByDescending(p => p.puntajeUsuario1)
            .Take(10)
            .ToListAsync();
        return partidas;
    }
}