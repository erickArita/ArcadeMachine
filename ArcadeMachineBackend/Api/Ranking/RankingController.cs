using Microsoft.AspNetCore.Mvc;

namespace ArcadeMachine.Api.Ranking;

[Route("api/[controller]/[action]")]
[ApiController]
public class RankingController : ControllerBase
{
    // inyectar el servicio de partidas y devolver los 2 rankings
    // crear recors de respuesta para los 2 rankings
    // uno recibe el id del juego para trael el ranking de ese juego
    // y elo tro recibe el id del jugador y del juego para traer el ranking de ese jugador
}