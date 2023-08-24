namespace ArcadeMachine.Core.Autentication.Models;

public record UserInfoResponse(
    string Username,
    string Email,
    Guid UserId
);