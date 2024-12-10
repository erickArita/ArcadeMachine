using ArcadeMachine.Core.Partida.Enums;
using ArcadeMachine.Core.Partida.Models;
using ArcadeMachine.Core.Partida.Services.PartidaService.Modelos;

namespace ArcadeMachine.Core.Partida.Services.PartidaService;

public interface IPartidaService
{
    PartidaTemporal Emparejar(Guid jugadorId, string username, Guid juegoId);
    PartidaTemporal EmparejarConIa(Guid jugadorId, string username, Guid juegoId,Guid ia);

    PartidaTemporal? TerminarPartida(Guid partidaId, Guid usuarioId);

    (PartidaTemporal, string) SumarGanador(
        Guid partidaId,
        Guid jugadorId,
        ResultadoPartidaEnum gano
    );

    string? GetUserName(Guid userId, Guid partidaId);
    PartidaTemporal ObtenerPartida(Guid partidaId);
    PartidaTemporal? ForzarTerminarPartida(string userName);
}