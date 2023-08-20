using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;

namespace ArcadeMachine.Core.Partida;

public class PartidasService
{
    private  List<PartidaTemporal> Partidas = new();
    
    public PartidaTemporal Emparejar(Guid jugadorId)
    {
        // tupla de partidas y hay pertidas disponibles
        var (partida, hayPartidasDisponibles) = HayPartidasDisponibles();

        if (hayPartidasDisponibles)
        {
            partida.AgregarJugador(jugadorId);
            return partida;
        }
        else
        {
            partida = CrearPartida(jugadorId);
            return partida;
        }
    }
    
    private (PartidaTemporal, bool) HayPartidasDisponibles()
    {
        var partida = Partidas.FirstOrDefault(p => !p.Emparejada());
        return (partida, partida != null);
    }
    
    public PartidaTemporal CrearPartida(Guid jugadorId)
    {
        var partida = new PartidaTemporal();
        partida.AgregarJugador(jugadorId);
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
