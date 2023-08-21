using Microsoft.AspNetCore.SignalR;

namespace ArcadeMachine.Core.Autentication.Services;

public class NameUserIdProvider : IUserIdProvider
{
    public virtual string GetUserId(HubConnectionContext connection)
    {
        var name = connection.User?.Identities?.FirstOrDefault(i => i.Name is not null)?.Name;
        return name;
    }
}