import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { juegoSeleccionadoAdapter } from "../libraries/games/adapters/juegoSeleccionadoAdapter";
import { GameLobby } from "../libraries/games/components/GameLobby/GameLobby";
import { TipoJuegoEnum } from "../libraries/games/enums/TipoJuegoEnum";
import { useSignalREffect } from "../providers/SignalProvider";
import { useUser } from "../providers/UserProvider";
import { useLazyEmparejarQuery } from "./api/Partidas/partidas";
import { JuegoParams } from "../libraries/games/constants/juegoParams";
import { useWaves } from "../providers/WavesProvider";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";

export const GameLobbyFeature = () => {
  const { tipoJuego } = useParams<{ tipoJuego: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const [emparejarQuery] = useLazyEmparejarQuery();

  const { setWaveColor } = useWaves();
  useEffect(() => {
    setWaveColor(WaveColorEnum.PURPLE);
  }, []);

  const [buscandoPartida, setBuscandoPartida] = useState(false);

  useSignalREffect(
    "Match",
    (message) => {
      setBuscandoPartida(false);
      navigate(`/partida/${message.partidaId}`);
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
