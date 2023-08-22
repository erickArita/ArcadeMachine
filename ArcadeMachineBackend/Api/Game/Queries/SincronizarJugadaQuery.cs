using ArcadeMachine.Core.Partida.Enums;

namespace ArcadeMachine.Api.Queries;

public record SincronizarJugadaQuery(
    Guid PartidaId,
    Guid JugadorId,
    PiedraPapelTijeraEnum Jugada
);