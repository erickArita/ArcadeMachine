import { JuegoParams, juegos } from "../constants/juegoParams";
import { TipoJuegoEnum } from "../enums/TipoJuegoEnum";

export const juegoSeleccionadoAdapter = (tipo: TipoJuegoEnum): JuegoParams => {
  const juego = juegos.find((juego) => juego.tipoJuego === tipo);
  if (!juego) throw new Error("Juego no encontrado");

  return juego;
};
