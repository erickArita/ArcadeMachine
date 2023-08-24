using ArcadeMachine.Core.Partida.Enums;

namespace ArcadeMachine.Api.Game.Requests;

public record ValidarGanadorRequest(Guid PartidaId, Guid JugadorId, ResultadoPartidaEnum Resultado);