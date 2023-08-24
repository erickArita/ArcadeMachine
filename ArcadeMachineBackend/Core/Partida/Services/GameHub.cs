using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;
using ArcadeMachine.Core.Partida.Services.PartidaService;
using ArcadeMachine.Infraestructure.Persistence;
using Microsoft.AspNetCore.SignalR;

namespace ArcadeMachine.Core.Partida.Services;

public class GameHub : Hub
{
    private readonly IPartidaService _partidaService;
    private readonly IPartidaRepositorio _partidaRepositorio;

    public GameHub(IPartidaService partidaService, IPartidaRepositorio partidaRepositorio)
    {
        _partidaService = partidaService;
        _partidaRepositorio = partidaRepositorio;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.Identity?.Name;
        await base.OnConnectedAsync();
    }

    public async void SincronizarJugada(SyncronizationType type, Guid PartidaId, Guid JugadorId, int query)
    {
        var partida = _partidaService.ObtenerPartida(PartidaId);
        var contrincante = partida.ObtenerContrincante(JugadorId);

        await Clients.User(contrincante).SendAsync("SincronizarJugada", type, query);
    }

    public async Task AbandonarPartida(Guid JugadorId)
    {
        var userName = Context.User?.Identity?.Name;
        var partida = _partidaService.ForzarTerminarPartida(userName);
        if (partida is null)
        {
            return;
        }

        var contrincante = partida.ObtenerContrincante(JugadorId);
        await _partidaRepositorio.CrearPartida(partida);
        await Clients.User(contrincante).SendAsync("AbandonarPartida");
    }


    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userName = Context.User?.Identity?.Name;

        var partida = _partidaService.ForzarTerminarPartida(userName);

        if (partida is not null)
        {
            await _partidaRepositorio.CrearPartida(partida);
        }

        await base.OnDisconnectedAsync(exception);
    }
}