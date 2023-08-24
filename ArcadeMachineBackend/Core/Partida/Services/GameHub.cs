using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Services.PartidaService;
using Microsoft.AspNetCore.SignalR;

namespace ArcadeMachine.Core.Partida.Services;

public class GameHub : Hub
{
    private readonly IPartidaService _partidaService;

    public GameHub(IPartidaService partidaService)
    {
        _partidaService = partidaService;
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
    

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userName = Context.User?.Identity?.Name;

        _partidaService.ForzarTerminarPartida(userName);
        return base.OnDisconnectedAsync(exception);
    }
}