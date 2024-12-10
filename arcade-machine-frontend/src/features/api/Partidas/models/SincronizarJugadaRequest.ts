import { PiedraPapelTijera } from "../../enums/PiedraPepelTijeraEnum";

export interface SincronizarJugadaRequest {
  PartidaId: string;
  JugadorId: string;
  Jugada: PiedraPapelTijera;
}
