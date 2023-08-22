namespace ArcadeMachine.Api.Game.Requests;

public record ValidarGanadorRequest(Guid PartidaId, Guid JugadorId, bool Resultado);