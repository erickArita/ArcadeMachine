using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;

namespace ArcadeMachine.Core.Partida.Services.PartidaService;

public class PartidasService : IPartidaService
{
    private List<PartidaTemporal> Partidas = new();

    public PartidaTemporal Emparejar(Guid jugadorId, string username, Guid juegoId)
    {
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

    public PartidaTemporal EmparejarConIa(Guid jugadorId, string username, Guid juegoId, Guid ia)
    {
        var partida = CrearPartida(jugadorId, username, juegoId);
        partida.AgregarJugador(ia, "IA", TipoJugadorEnum.Invitado);
        return partida;
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

    public PartidaTemporal? TerminarPartida(Guid partidaId, Guid usuarioId)
    {
        var partida = Partidas.First(p => p.PartidaId == partidaId);

        if (!partida.Terminada)
        {
            partida.Terminada = true;
        }
        else
        {
            Partidas.Remove(partida);
            return partida;
        }

        return null;
    }

    public (PartidaTemporal, string?) SumarGanador(
        Guid partidaId,
        Guid jugadorId,
        ResultadoPartidaEnum gano
    )
    {
        TipoJugadorEnum ganador = TipoJugadorEnum.Anfitrion;
        var partida = ObtenerPartida(partidaId);


        if (gano == ResultadoPartidaEnum.Victoria)
        {
            ganador = partida.SetGanador(jugadorId);
        }


        if (gano == ResultadoPartidaEnum.Derrota)
        {
            var contrincanteId = partida.ObtenerContrincanteId(jugadorId);
            ganador = partida.SetGanador(contrincanteId);
        }

        var userNameWinner = ganador == TipoJugadorEnum.Invitado ? partida.userName2 : partida.userName1;
        if (userNameWinner is null)
        {
            throw new Exception("No se encontro el usuario ganador");
        }

        return (partida, userNameWinner);
    }

    public string? GetUserName(Guid userId, Guid partidaId)
    {
        var partida = ObtenerPartida(partidaId);
        if (partida.JugadorId1 == userId)
        {
            return partida.userName1;
        }

        return partida.userName2;
    }


    public PartidaTemporal ObtenerPartida(Guid partidaId)
    {
        return Partidas.First(p => p.PartidaId == partidaId);
    }

    private PartidaTemporal? UsuarioEnPartida(string userName)
    {
        return Partidas?.FirstOrDefault(
            p => p.userName1?.ToString() == userName || p.userName2?.ToString() == userName);
    }

    public PartidaTemporal? ForzarTerminarPartida(string userName)
    {
        var partida = UsuarioEnPartida(userName);
        if (partida is null)
        {
            return null;
        }

        if (partida.Emparejada())
        {
            var contrincante = partida.ObtenerContrincante(userName);
            if (contrincante == partida.JugadorId1)
            {
                partida.ResultadoJugador1 = partida.ResultadoJugador2 + 1;
            }
            else
            {
                partida.ResultadoJugador2 = partida.ResultadoJugador1 + 1;
            }

            Partidas.Remove(partida);
            return partida;
        }

        Partidas.Remove(partida);
        return null;
    }
}