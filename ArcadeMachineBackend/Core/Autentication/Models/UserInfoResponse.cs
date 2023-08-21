namespace ArcadeMachine.Core.Autentication;

public record UserInfoResponse(
    string Username,
    string Email,
    Guid UserId
);