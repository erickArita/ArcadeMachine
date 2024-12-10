using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;
using ArcadeMachine.Core.Partida.Services.PartidaService;
using ArcadeMachine.Infraestructure.Persistence;
using ArcadeMachine.Services;
using Microsoft.AspNetCore.SignalR;
using NuGet.Protocol;

namespace ArcadeMachine.Core.Partida.Services;

public class GameHub(
    IPartidaService _partidaService,
    IPartidaRepositorio _partidaRepositorio,
    IChatGptService _chatGptService,
    IHubContext<GameHub> _hubContext
) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.Identity?.Name;
        await base.OnConnectedAsync();
    }

    public async void SyncGame(Guid PartidaId, Guid JugadorId, string evento)
    {
        var partida = _partidaService.ObtenerPartida(PartidaId);
        var humanPlayer = partida.ObtenerUserName(JugadorId);

        if (evento == "initGame")
        {
            var palabra = await _chatGptService.GetResponseAsync(
                "Obtienen una palabra de entre 5 a 10 letras",
                "eres un jugador de ahorcado profesional,de vez en cuando sube o baja la dificultad de esas palabras y" +
                " le daras a tu contrincante la palabra que " +
                "debe adivinar, responderas solo la palabra que elegiste, para que una aplicacion pueda " +
                "validar si el otro jugador la adivina"
            );
            await _hubContext.Clients.User(humanPlayer).SendAsync("SyncGame", evento, palabra);
        }
    }

    public async void SincronizarJugada(SyncronizationType type, Guid PartidaId, Guid JugadorId, int query)
    {
        var partida = _partidaService.ObtenerPartida(PartidaId);
        if (partida is null)
        {
            return;
        }

        if (type == SyncronizationType.Jugada)
        {
            Console.WriteLine(partida.ToJson());
        }

        var contrincante = partida.ObtenerContrincante(JugadorId);

        if (contrincante is not null)
        {
            await Clients.User(contrincante).SendAsync("SincronizarJugada", type, query);
        }
    }

    public async Task AbandonarPartida(Guid JugadorId)
    {
        var userName = Context.User?.Identity?.Name;
        var partida = _partidaService.ForzarTerminarPartida(userName);

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