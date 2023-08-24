using ArcadeMachine.Api.Game.Responses;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Domain.Entities;
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
            Id = Guid.NewGuid(),
            juegoId = partidaTemporal.MinijuegoId,
            usuario1Id = partidaTemporal.JugadorId1.ToString(),
            usuario2Id = partidaTemporal.JugadorId2.ToString(),
            puntajeUsuario1 = partidaTemporal.ResultadoJugador1,
            puntajeUsuario2 = partidaTemporal.ResultadoJugador2,
            fechaPartida = new DateTime(),
        };
        await _appContext.Partidas.AddAsync(partida);
        await _appContext.SaveChangesAsync();
        return partida;
    }

    //traer las ultimas 10 partidas de un usario


    public async Task<List<UserHistory>> ObtenerUltimasPartidas(Guid juegoId, string jugadorId)
    {
        var jugadasConResultado = await _appContext.Partidas
            .Include(p => p.usuario1)
            .Include(p => p.usuario2)
            .Where(p => p.usuario1Id == jugadorId || p.usuario2Id == jugadorId)
            .OrderByDescending(p => p.fechaPartida)
            .Take(10)
            .Select(p => new UserHistory(
                p.Id,
                p.usuario1Id == jugadorId ? p.usuario2.UserName : p.usuario1.UserName,
                (p.usuario1Id == jugadorId && p.puntajeUsuario1 > p.puntajeUsuario2) ||
                (p.usuario2Id == jugadorId && p.puntajeUsuario2 > p.puntajeUsuario1) ? "Ganaste" :
                (p.puntajeUsuario1 == p.puntajeUsuario2) ? "Empate" : "Perdiste"
            ))
            .ToListAsync();

        return jugadasConResultado;
    }

    record Users(string Id, string Id2);

    // traer los mejores 10 jugadores por juego
    public async Task<List<MundialTop>> ObtenerMejoresJugadoresPorJuego(Guid juegoId)
    {
        var usuarios = await _appContext.Users
            .ToListAsync();

        var ranking = await _appContext.Partidas
            .Where(p => p.juegoId == juegoId)
            .GroupBy(p => p.usuario1Id)
            .Select(g => new
            {
                UsuarioId = g.Key,
                PuntajeTotal = g.Sum(p => p.puntajeUsuario1)
            })
            .Union(_appContext.Partidas
                .Where(p => p.juegoId == juegoId)
                .GroupBy(p => p.usuario2Id)
                .Select(g => new
                {
                    UsuarioId = g.Key,
                    PuntajeTotal = g.Sum(p => p.puntajeUsuario2)
                }))
            .GroupBy(x => x.UsuarioId)
            .Select(g => new
            {
                UsuarioId = g.Key,
                PuntajeTotal = g.Sum(x => x.PuntajeTotal)
            })
            .OrderByDescending(x => x.PuntajeTotal)
            .Take(10)
            .ToListAsync();

        var mejoresJugadores = ranking
            .Select(x => usuarios.FirstOrDefault(u => u.Id == x.UsuarioId))
            .Select((u, i) => new MundialTop(u.Id, i + 1, u.UserName))
            .ToList() ?? new List<MundialTop>();

        return mejoresJugadores;
    }

    public async Task<List<MiniJuego>> ObtenerMiniJuegos()
    {
        var minijuegos = await _appContext.Minijuegos.ToListAsync();
        return minijuegos;
    }

    public async Task<MiniJuego> ObtenerMiniJuego(Guid minijuegoId)
    {
        var minijuego = await _appContext.Minijuegos.FirstOrDefaultAsync(m => m.Id == minijuegoId) ??
                        throw new Exception("No se encontro el minijuego");
        return minijuego;
    }
}