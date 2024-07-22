import { TipoJuegoEnum } from "../enums/TipoJuegoEnum";

export const tipoJuegoAdapter = (tipo?: TipoJuegoEnum): string => {
  if (!tipo) return "No definido";
  const tipoJuego: Record<number, string> = {
    [TipoJuegoEnum.PiedraPapelTijera]: "Piedra Papel Tijera",
    [TipoJuegoEnum.XO]: "XO",
  };

  return tipoJuego?.[tipo];
};
