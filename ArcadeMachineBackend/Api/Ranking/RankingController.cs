using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArcadeMachine.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RankingController : ControllerBase
    {
       // inyectar el servicio de partidas y devolver los 2 rankings
       // crear recors de respuesta para los 2 rankings
       // uno recibe el id del juego para trael el ranking de ese juego
       // y elo tro recibe el id del jugador y del juego para traer el ranking de ese jugador
    }
}
