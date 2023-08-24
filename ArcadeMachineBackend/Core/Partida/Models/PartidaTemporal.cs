using ArcadeMachine.Core.Partida.Enums;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace ArcadeMachine.Core.Partida.Models;

public class PartidaTemporal
{
    public Guid PartidaId = Guid.NewGuid();
    public Guid JugadorId1 { get; set; }
    public Guid JugadorId2 { get; set; }
    public int ResultadoJugador1 { get; set; }
    public int ResultadoJugador2 { get; set; }
    public Guid MinijuegoId { get; set; }
    public string? userName1 { get; set; }
    public string? userName2 { get; set; }
    public bool Terminada { get; set; }

    public PartidaTemporal Revancha()
    {
        PartidaId = Guid.NewGuid();
        ResultadoJugador1 = 0;
        ResultadoJugador2 = 0;

        return this;
    }

    public TipoJugadorEnum SetGanador(Guid jugadorId)
    {
        var tipoJugador = ObtenerTipoJugar(jugadorId);

        if (tipoJugador == TipoJugadorEnum.Anfitrion)
        {
            ResultadoJugador1++;
            return tipoJugador;
        }

        ResultadoJugador2++;
        return tipoJugador;
    }


    public bool Emparejada()
    {
        return userName1 != null && userName2 != null;
    }

    public TipoJugadorEnum ObtenerTipoJugar(Guid jugadorId)
    {
        if (jugadorId == JugadorId1)
        {
            return TipoJugadorEnum.Anfitrion;
        }

        return TipoJugadorEnum.Invitado;
    }

    public TipoJugadorEnum ObtenerContrincanteTipoJugar(Guid jugadorId)
    {
        var tipoJugador = ObtenerTipoJugar(jugadorId);

        if (tipoJugador == TipoJugadorEnum.Anfitrion)
        {
            return TipoJugadorEnum.Invitado;
        }

        return TipoJugadorEnum.Anfitrion;
    }

    // clase para agregar el jugador 2 a la partida
    public void AgregarJugador(Guid jugadorId, string userName, TipoJugadorEnum tipoJugador)
    {
        //validar que el jugador que se quiere agregar no este en la partida
        if (jugadorId == JugadorId1 || jugadorId == JugadorId2)
        {
            throw new Exception("El jugador ya esta en la partida");
        }

        if (tipoJugador == TipoJugadorEnum.Anfitrion)
        {
            JugadorId1 = jugadorId;
            userName1 = userName;
        }
        else
        {
            JugadorId2 = jugadorId;
            userName2 = userName;
        }
    }

    public void EliminarJugador(Guid jugadorId)
    {
        var tipoJugador = ObtenerTipoJugar(jugadorId);

        if (tipoJugador == TipoJugadorEnum.Anfitrion)
        {
            userName1 = null;
        }
        else
        {
            userName2 = null;
        }
    }

    public string ObtenerContrincante(Guid jugadorId)
    {
        if (jugadorId == JugadorId1)
        {
            return userName2;
        }

        return userName1;
    }

    public Guid ObtenerContrincante(string jugador)
    {
        if (jugador == userName1)
        {
            return JugadorId1;
        }

        return JugadorId2;
    }

    public Guid ObtenerContrincanteId(Guid jugadorId)
    {
        if (jugadorId == JugadorId1)
        {
            return JugadorId2;
        }

        return JugadorId1;
    }

    public string ObtenerUserName(Guid jugadorId)
    {
        if (jugadorId == JugadorId1)
        {
            return userName1 ?? throw new Exception("El jugador no esta en la partida");
        }

        return userName2 ?? throw new Exception("El jugador no esta en la partida");
    }
}