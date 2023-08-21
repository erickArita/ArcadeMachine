using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;

namespace ArcadeMachine.Core.Partida;

public interface IPartidaService
{
    PartidaTemporal Emparejar(Guid jugadorId, string username);
}