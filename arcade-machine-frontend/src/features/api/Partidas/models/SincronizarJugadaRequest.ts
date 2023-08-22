import { PiedraPapelTijeraEnum } from "../../enums/PiedraPepelTijeraEnum";

export interface SincronizarJugadaRequest {
  PartidaId: string;
  JugadorId: string;
  Jugada: PiedraPapelTijeraEnum;
}
