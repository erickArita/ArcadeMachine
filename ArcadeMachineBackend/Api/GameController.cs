using ArcadeMachine.Core.Partida;
using ArcadeMachine.Core.Partida.Repositorios.PartidaRepositorio;
using ArcadeMachine.Infraestructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ArcadeMachine.Api;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class GameController : ControllerBase
{
    private readonly IPartidaService _partidaService;
    private readonly IPartidaRepositorio _partidaRepositorio;
    private readonly IHubContext<GameHub> _hubContext;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly AplicationDbContext _context;

    public GameController(IPartidaService partidaService, IPartidaRepositorio partidaRepositorio,
        IHubContext<GameHub> hubContext,
        UserManager<IdentityUser> userManager,
        AplicationDbContext context
    )
    {
        _partidaService = partidaService;
        _partidaRepositorio = partidaRepositorio;
        _hubContext = hubContext;
        _userManager = userManager;
        _context = context;
    }


    [HttpGet]
    public async Task<OkResult> Emparejar(Guid userId)
    {
        var username = User.Identity.Name;
        if (username is null)
        {
            throw new Exception("No se pudo obtener el usuario");
        }

        var partida = _partidaService.Emparejar(userId, username);
        if (partida.Emparejada())
        {
            var user1 = partida.userName1;
            var user2 = partida.userName2;
            await _hubContext.Clients.Users(user1, user2).SendAsync("Match", partida.PartidaId);
        }

        return Ok();
    }
}