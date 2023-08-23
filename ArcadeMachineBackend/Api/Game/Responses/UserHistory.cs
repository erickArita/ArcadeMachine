namespace ArcadeMachine.Api.Game.Responses;

public record UserHistory(
    Guid Id,
    string Contrincante,
    bool Gano
    );