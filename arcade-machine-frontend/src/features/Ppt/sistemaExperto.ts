import { PiedraPapelTijera } from "../api/enums/PiedraPepelTijeraEnum";
import { ResultadoPartida } from "../api/enums/ResultadoPartidaEunm";

const reglas = [
  //base de conocimientos y reglas
  { jugada: PiedraPapelTijera.Piedra, vence: PiedraPapelTijera.Tijera },
  { jugada: PiedraPapelTijera.Papel, vence: PiedraPapelTijera.Piedra },
  { jugada: PiedraPapelTijera.Tijera, vence: PiedraPapelTijera.Papel },
];

//motor de inferencia
export const inferirResultado = (jugada1: PiedraPapelTijera, jugada2: PiedraPapelTijera): ResultadoPartida => {
  if(jugada1 === jugada2) ResultadoPartida.Empate;

  const regla = reglas.find(r => r.jugada === jugada1); //piedra vence tijera
  //tijera  === papel
  if(regla?.vence  === jugada2) {
    return ResultadoPartida.Victoria;
  }
  return ResultadoPartida.Derrota;
};