import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameLobby } from "../libraries/games/components/GameLobby/GameLobby";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";
import { invoke, useSignalREffect } from "../providers/SignalProvider";
import { useUser } from "../providers/UserProvider";
import { useWaves } from "../providers/WavesProvider";
import {
  useLazyEmparejarQuery,
  useObtenerJuegoPorIdQuery,
} from "./api/Partidas/partidas";

export const GameLobbyFeature = () => {
  const { tipoJuego } = useParams<{ tipoJuego: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: juego, isLoading } = useObtenerJuegoPorIdQuery(
    {
      juegoId: tipoJuego,
    },
    {
      skip: !tipoJuego,
      refetchOnMountOrArgChange: true,
    }
  );

  const [emparejarQuery] = useLazyEmparejarQuery();

  const { setWaveColor } = useWaves();
  useEffect(() => {
    setWaveColor(WaveColorEnum.PURPLE);
  }, []);

  const [buscandoPartida, setBuscandoPartida] = useState(false);

  useSignalREffect(
    "Match",
    (partidaId, tipoJugador) => {
      console.log("Match", partidaId, tipoJugador);

      setBuscandoPartida(false);
      navigate(`partida/${partidaId}/${tipoJugador}`);
    },
    []
  );

  const onEmparejar = () => {
    if (!user || !tipoJuego) return;
    emparejarQuery({ userId: user.userId, juegoId: tipoJuego });
    setBuscandoPartida(true);
  };

  const onCancelarBusqueda = () => {
    invoke("AbandonarPartida", user?.userId);
    setBuscandoPartida(false);
  };

  return (
    <GameLobby
      buscandoPartida={buscandoPartida}
      card={{
        color: juego?.color,
        img: juego?.img,
        shadowColor: juego?.shadowColor,
        title: juego?.nombre,
      }}
      title={juego?.nombre || ""}
      onBuscarPartida={onEmparejar}
      historialData={[]}
      onCancelarBusqueda={onCancelarBusqueda}
      isLoading={isLoading}
      rankingData={[]}
    />
  );
};
