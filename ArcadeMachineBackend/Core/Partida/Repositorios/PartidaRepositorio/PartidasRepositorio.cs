using System.Collections.Immutable;
using ArcadeMachine.Api.Game.Responses;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Infraestructure.Persistence;
using Microsoft.AspNetCore.Identity;
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
    
    
    public async Task<List<UserHistory>> ObtenerUltimasPartidas(Guid juegoId, string jugadorId)
    {
        var ultimasPartidas = await _appContext.Partidas
            .Where(p => p.juegoId == juegoId && (p.usuario1Id == jugadorId || p.usuario2Id == jugadorId))
            .OrderByDescending(p => p.fechaPartida)
            .Take(10)
            .Select(p => new UserHistory
            (
                p.Id,
                p.usuario1Id == jugadorId ? p.usuario2.UserName : p.usuario1.UserName,
                jugadorId == p.usuario1Id ? p.puntajeUsuario1 > p.puntajeUsuario2 : p.puntajeUsuario2 > p.puntajeUsuario1
            ))
            .ToListAsync();

        return ultimasPartidas;
    }
    
    // traer los mejores 10 jugadores por juego
    public async Task<List<MundialTop>> ObtenerMejoresJugadoresPorJuego(Guid juegoId)
    {
        var userIds = await _appContext.Partidas
            .Where(p => p.juegoId == juegoId)
            .SelectMany(p => new[] { p.usuario1Id, p.usuario2Id })
            .Distinct()
            .ToListAsync();

        var usuarios = await _appContext.Users
            .Where(u => userIds.Contains(u.Id))
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
            .ToList()?? new List<MundialTop>();

        return mejoresJugadores;
    }
}