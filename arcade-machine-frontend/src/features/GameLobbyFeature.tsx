import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { juegoSeleccionadoAdapter } from "../libraries/games/adapters/juegoSeleccionadoAdapter";
import { GameLobby } from "../libraries/games/components/GameLobby/GameLobby";
import { TipoJuegoEnum } from "../libraries/games/enums/TipoJuegoEnum";
import { useSignalREffect } from "../providers/SignalProvider";
import { useUser } from "../providers/UserProvider";
import { useLazyEmparejarQuery } from "./api/Partidas/partidas";
import { JuegoParams } from "../libraries/games/constants/juegoParams";

export const GameLobbyFeature = () => {
  const { tipoJuego } = useParams<{ tipoJuego: string }>();
  const { user } = useUser();

  const [emparejarQuery] = useLazyEmparejarQuery();

  const [buscandoPartida, setBuscandoPartida] = useState(false);

  useSignalREffect(
    "Match",
    (message) => {
      console.log(message);
      setBuscandoPartida(false);
    },
    []
  );

  const [juegoSeleccionadoProps, seEncontro] = juegoSeleccionadoAdapter(
    Number(tipoJuego) as unknown as TipoJuegoEnum
  );

  if (!seEncontro) {
    return <Navigate to="/" />;
  }

  const onEmparejar = () => {
    if (!user) return;
    emparejarQuery({ userId: user.userId });
    setBuscandoPartida(true);
  };

  return (
    <GameLobby
      buscandoPartida={buscandoPartida}
      card={juegoSeleccionadoProps as JuegoParams}
      title={juegoSeleccionadoProps?.title}
      onBuscarPartida={onEmparejar}
      historialData={[]}
      rankingData={[]}
    />
  );
};
