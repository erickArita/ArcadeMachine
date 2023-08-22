import { JuegoParams, juegos } from "../constants/juegoParams";
import { TipoJuegoEnum } from "../enums/TipoJuegoEnum";

export const juegoSeleccionadoAdapter = (
  tipo: TipoJuegoEnum
): [JuegoParams | undefined, boolean] => {
  const juego = juegos.find((juego) => juego.tipoJuego === tipo);
  if (!juego) return [undefined, !false];

  return [juego, !!juego.tipoJuego];
};
