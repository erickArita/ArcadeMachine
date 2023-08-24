using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Core.Partida.Services.PartidaService.Modelos;

namespace ArcadeMachine.Core.Partida.Services.PartidaService;

public class PartidasService : IPartidaService
{
    private List<PartidaTemporal> Partidas = new();

    public PartidaTemporal Emparejar(Guid jugadorId, string username, Guid juegoId)
    {
        // tupla de partidas y hay pertidas disponibles
        var (partida, hayPartidasDisponibles) = HayPartidasDisponibles(juegoId);

        if (hayPartidasDisponibles)
        {
            partida.AgregarJugador(jugadorId, username, TipoJugadorEnum.Invitado);
            return partida;
        }
        else
        {
            partida = CrearPartida(jugadorId, username, juegoId);
            return partida;
        }
    }

    private (PartidaTemporal?, bool) HayPartidasDisponibles(Guid juegoId)
    {
        var partida = Partidas.Where(p => p.MinijuegoId == juegoId).FirstOrDefault(p => !p.Emparejada());
        return (partida, partida != null);
    }

    private PartidaTemporal CrearPartida(Guid jugadorId, string username, Guid juegoId)
    {
        var partida = new PartidaTemporal();
        partida.MinijuegoId = juegoId;
        partida.AgregarJugador(jugadorId, username, TipoJugadorEnum.Anfitrion);
        Partidas.Add(partida);
        return partida;
    }

    // clase para eliminar la partida temporal
    public PartidaTemporal TerminarPartida(Guid partidaId, Guid usuarioId)
    {
        var partida = Partidas.First(p => p.PartidaId == partidaId);

        partida.EliminarJugador(usuarioId);

        if (!partida.Emparejada())
        {
            Partidas.Remove(partida);
        }

        return partida;
    }

    public PartidaTemporal ActualizarPartida(Guid partidaId, Guid jugadorId, ResultadoPartidaEnum gano)
    {
        var partida = ObtenerPartida(partidaId);

        if (partida.ObtenerTipoJugar(jugadorId) == TipoJugadorEnum.Anfitrion && gano == ResultadoPartidaEnum.Victoria)
        {
            partida.ResultadoJugador1++;
        }
        else
        {
            partida.ResultadoJugador2++;
        }

        return partida;
    }

    public TipoJugadorEnum GanadorPartida(PartidaTemporal partida)
    {
        if (partida.ResultadoJugador1 > partida.ResultadoJugador2)
        {
            return TipoJugadorEnum.Anfitrion;
        }
        else
        {
            return TipoJugadorEnum.Invitado;
        }
    }

    public Score ObtenerScore(PartidaTemporal partidaActualizada)
    {
        var score = new Score(
            ScoreUsuario1: partidaActualizada.ResultadoJugador1,
            ScoreUsuario2: partidaActualizada.ResultadoJugador2,
            UsuarioGanador: GanadorPartida(partidaActualizada)
        );

        return score;
    }

    public PartidaTemporal ObtenerPartida(Guid partidaId)
    {
        var partida = Partidas.First(p => p.PartidaId == partidaId);
        return partida;
    }

    private PartidaTemporal? UsuarioEnPartida(string userName)
    {
        return Partidas?.FirstOrDefault(
            p => p.userName1?.ToString() == userName || p.userName2?.ToString() == userName);
    }

    public void ForzarTerminarPartida(string userName)
    {
        var partida = UsuarioEnPartida(userName);
        if (partida is null) return;
        if (partida.Emparejada()) return;

        if (partida is not null)
        {
            Partidas.Remove(partida);
        }
    }
}