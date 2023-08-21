using ArcadeMachine.Core.Partida.Enums;

namespace ArcadeMachine.Core.Partida.Models;

public class PartidaTemporal
{
    public Guid PartidaId = Guid.NewGuid(); 
    public Guid JugadorId1 { get; set; }
    public Guid JugadorId2 { get; set; }
    public int ResultadoJugador1 { get; set; }
    public int ResultadoJugador2 { get; set; }
    public Guid MinijuegoId { get; set; }
    public string userName1 { get; set; }
    public string userName2 { get; set; }

    public PartidaTemporal Revancha()
    {
        PartidaId = Guid.NewGuid();
        ResultadoJugador1 = 0;
        ResultadoJugador2 = 0;

        return this;
    }

    public bool Emparejada()
    {
        return JugadorId1 != Guid.Empty && JugadorId2 != Guid.Empty;
    }

    public TipoJugadorEnum ObtenerTipoJugar(Guid jugadorId)
    {
        if (jugadorId == JugadorId1)
        {
            return TipoJugadorEnum.Anfitrion;
        }

        return TipoJugadorEnum.Invitado;
    }

    // clase para agregar el jugador 2 a la partida
    public void AgregarJugador(Guid jugadorId, string userName, TipoJugadorEnum tipoJugador)
    {
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

    public bool EsPartidaTerminada()
    {
        return ResultadoJugador1 > 0 && ResultadoJugador2 > 0;
    }
}