import { ResultadoPartida } from "../../enums/ResultadoPartidaEunm";

export interface ValidarGanadorRequest {
  partidaId: string;
  jugadorId: string;
  resultado: ResultadoPartida;
}
