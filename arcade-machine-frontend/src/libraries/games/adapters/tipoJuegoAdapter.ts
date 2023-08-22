import { TipoJuegoEnum } from "../enums/TipoJuegoEnum";

export const tipoJuegoAdapter = (tipo?: TipoJuegoEnum): string => {
  const tipoJuego = {
    [TipoJuegoEnum.PiedraPapelTijera]: "Piedra Papel Tijera",
    [TipoJuegoEnum.XO]: "XO",
  };

  if (!tipo) return "No definido";
  return tipoJuego[tipo];
};
