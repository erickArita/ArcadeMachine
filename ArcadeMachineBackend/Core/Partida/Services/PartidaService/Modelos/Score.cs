using ArcadeMachine.Core.Partida.Enums;

namespace ArcadeMachine.Core.Partida.Services.PartidaService.Modelos;

public record Score(
    int score,
    bool isWinner
);