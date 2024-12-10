import type { WaveColorEnum } from "../../../../libraries/games/enums/waveColor";

export interface Minijuego {
  id: string;
  nombre: string;
  img: string;
  color: string;
  shadowColor: string;
  slug: string,
  metadata: {
    ia?: boolean,
    waveColor?: WaveColorEnum
  }
}
