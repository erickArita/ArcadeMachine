namespace ArcadeMachine.Api.Game.Requests;

public record TerminarPartidaRequest(Guid PartidaId, Guid JugadorId);