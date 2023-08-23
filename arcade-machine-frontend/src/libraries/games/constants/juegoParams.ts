import { CardProps } from "../components/Card/Card";
import { TipoJuegoEnum } from "../enums/TipoJuegoEnum";
import { WaveColorEnum } from "../enums/waveColor";

export interface JuegoParams extends CardProps {
  tipoJuego: TipoJuegoEnum;
  waveColor: WaveColorEnum;
}

export const juegos: JuegoParams[] = [
  {
    tipoJuego: TipoJuegoEnum.PiedraPapelTijera,
    color: "#9b57f0",
    img: "/piedra.png",
    shadowColor: "#dcc1fd",
    title: "Piedra Papel Tijera",
    waveColor: WaveColorEnum.PURPLE,
  },
  {
    tipoJuego: TipoJuegoEnum.XO,
    color: "#ffb900",
    img: "/ahorcado.png",
    shadowColor: "#ffe49e",
    title: "XO",
    waveColor: WaveColorEnum.YELLOW,
  },
  {
    tipoJuego: TipoJuegoEnum.AHORCADO,
    color: "#dd2bbc",
    img: "dinosaurio.png",
    shadowColor: "#fba4ea",
    title: "Ahorcado",
    waveColor: WaveColorEnum.PINK,
  },
];
