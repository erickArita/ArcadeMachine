import { useParams } from "react-router-dom";
import { tipoJuegoAdapter } from "../../adapters/tipoJuegoAdapter";
import { TipoJuegoEnum } from "../../enums/TipoJuegoEnum";
import { Historial, Ranking } from "../Rankings/Rankings";
import { Card } from "../Card/Card";
import { juegoSeleccionadoAdapter } from "../../adapters/juegoSeleccionadoAdapter";

export const GameLobby = () => {
  const { tipoJuego } = useParams<{ tipoJuego: string }>();

  const juegoNombre = tipoJuegoAdapter(tipoJuego as unknown as TipoJuegoEnum);
  const juegoSeleccionadoProps = juegoSeleccionadoAdapter(
    tipoJuego as unknown as TipoJuegoEnum
  );
  return (
    <section>
      <h3>{juegoNombre}</h3>
      <div>
        <Historial data={[]} />
        <Card color={juegoSeleccionadoProps.color} img="" shadowColor="" title="" />
        <Ranking data={[]} />
      </div>
    </section>
  );
};
