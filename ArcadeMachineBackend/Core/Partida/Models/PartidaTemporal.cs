using ArcadeMachine.Core.Partida.Enums;

namespace ArcadeMachine.Core.Partida.Models;

public class PartidaTemporal
{
    
    internal Guid PartidaId { get; set; }
    public Guid JugadorId1 { get; set; }
    public Guid JugadorId2 { get; set; }
    public int ResultadoJugador1 { get; set; }
    public int ResultadoJugador2 { get; set; }
    public Guid MinijuegoId { get; set; }

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
    public void AgregarJugador(Guid jugadorId)
    {
        this.JugadorId2 = jugadorId;
    }

    public bool EsPartidaTerminada()
    {
        return ResultadoJugador1 > 0 && ResultadoJugador2 > 0;
    }
}