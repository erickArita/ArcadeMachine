namespace ArcadeMachine.Api.Requests;

public record ValidarGanadorRequest(Guid PartidaId, Guid JugadorId, bool Resultado);