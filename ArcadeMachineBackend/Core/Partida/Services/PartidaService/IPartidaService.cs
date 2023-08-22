using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Core.Partida.Services.PartidaService.Modelos;

namespace ArcadeMachine.Core.Partida;

public interface IPartidaService
{
    PartidaTemporal Emparejar(Guid jugadorId, string username);
    PartidaTemporal ActualizarPartida(Guid partidaId, Guid jugadorId, bool gano);
    PartidaTemporal ObtenerPartida(Guid partidaId);
    PartidaTemporal TerminarPartida(Guid partidaId, Guid usuarioId);
    Score ObtenerScore(PartidaTemporal partidaActualizada);
}