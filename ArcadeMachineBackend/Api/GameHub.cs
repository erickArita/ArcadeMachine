using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ArcadeMachine.Api;

public class GameHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.Identity?.Name;
        await base.OnConnectedAsync();
    }

    public async void SendMessage(string message, string userId)
    {
        await Clients.User(userId).SendAsync("ReceiveMessage", message);
    }
}