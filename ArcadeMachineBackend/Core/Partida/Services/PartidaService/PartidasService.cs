using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;

namespace ArcadeMachine.Core.Partida.Services.PartidaService;

public class PartidasService : IPartidaService
{
    private List<PartidaTemporal> Partidas = new();

    public PartidaTemporal Emparejar(Guid jugadorId, string username)
    {
        // tupla de partidas y hay pertidas disponibles
        var (partida, hayPartidasDisponibles) = HayPartidasDisponibles();

        if (hayPartidasDisponibles)
        {
            partida.AgregarJugador(jugadorId, username, TipoJugadorEnum.Invitado);
            return partida;
        }
        else
        {
            partida = CrearPartida(jugadorId, username);
            return partida;
        }
    }

    private (PartidaTemporal, bool) HayPartidasDisponibles()
    {
        var partida = Partidas.FirstOrDefault(p => !p.Emparejada());
        return (partida, partida != null);
    }

    private PartidaTemporal CrearPartida(Guid jugadorId, string username)
    {
        var partida = new PartidaTemporal();
        partida.AgregarJugador(jugadorId, username, TipoJugadorEnum.Anfitrion);
        Partidas.Add(partida);
        return partida;
    }

    // clase para eliminar la partida temporal
    public void TerminarPartida(Guid partidaId)
    {
        var partida = Partidas.FirstOrDefault(p => p.PartidaId == partidaId);
        Partidas.Remove(partida);
    }

    public PartidaTemporal ActualizarPartida(Guid partidaId, Guid jugadorId, int resultado, TipoJugadorEnum tipoJugador)
    {
        var partida = Partidas.First(p => p.PartidaId == partidaId);
        if (tipoJugador == TipoJugadorEnum.Anfitrion)
        {
            partida.ResultadoJugador1 = resultado;
        }
        else
        {
            partida.ResultadoJugador2 = resultado;
        }

        if (partida.EsPartidaTerminada())
        {
            return partida;
        }
        else
        {
            return null;
        }
    }
}