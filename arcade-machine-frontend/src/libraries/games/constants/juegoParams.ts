import { CardProps } from "../components/Card/Card";
import { TipoJuegoEnum } from "../enums/TipoJuegoEnum";

export interface JuegoParams extends CardProps {
  tipoJuego: TipoJuegoEnum;
}

export const juegos: JuegoParams[] = [
  {
    tipoJuego: TipoJuegoEnum.PiedraPapelTijera,
    color: "#9b57f0",
    img: "/piedra.png",
    shadowColor: "#dcc1fd",
    title: "Piedra Papel Tijera",
  },
  {
    tipoJuego: TipoJuegoEnum.XO,
    color: "#ffb900",
    img: "/ahorcado.png",
    shadowColor: "#ffe49e",
    title: "Piedra Papel Tijera",
  },
  {
    tipoJuego: TipoJuegoEnum.AHORCADO,
    color: "#dd2bbc",
    img: "dinosaurio.png",
    shadowColor: "#fba4ea",
    title: "Piedra Papel Tijera",
  },
];
