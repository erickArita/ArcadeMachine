import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameLobby } from "../libraries/games/components/GameLobby/GameLobby";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";
import { invoke, useSignalREffect } from "../providers/SignalProvider";
import { useUser } from "../libraries/auth/hooks/useUser";
import { useWaves } from "../providers/WavesProvider";
import {
  useLazyEmparejarQuery,
  useObtenerJuegoPorIdQuery,
} from "./api/Partidas/partidas";
import {
  useRankingPorJuegoQuery,
  useWankingPorUsuarioQuery,
} from "./api/rankings/rankings";
import { speak } from "../utils/speechUtil";

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

  const [ emparejarQuery ] = useLazyEmparejarQuery();

  const { setWaveColor } = useWaves();

  const [ buscandoPartida, setBuscandoPartida ] = useState(false);

  useSignalREffect(
    "Match",
    (partidaId, tipoJugador) => {
      setBuscandoPartida(false);
      navigate(`partida/${partidaId}/${tipoJugador}`);
    },
    []
  );

  const onEmparejar = () => {
    if(!user || !tipoJuego) return;
    emparejarQuery({ userId: user.userId, juegoId: tipoJuego });
    setBuscandoPartida(true);
  };

  const onCancelarBusqueda = () => {
    invoke("AbandonarPartida", user?.userId);
    setBuscandoPartida(false);
  };

  const { data: RankingPorJuego, isLoading: isLoadingRankingPorJuego } =
    useRankingPorJuegoQuery(
      { juegoId: tipoJuego },
      {
        skip: !tipoJuego,
      }
    );

  const { data: WankingPorUsuario, isLoading: isLoadingWankingPorUsuario } =
    useWankingPorUsuarioQuery(
      { juegoId: tipoJuego, jugadorId: user?.userId },
      {
        skip: !user?.userId || !tipoJuego,
      }
    );

  useEffect(() => {
    setWaveColor(WaveColorEnum.PURPLE);
  }, []);

  return (
    <>
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
        historialData={WankingPorUsuario?.map((p) => ({
          contrincante: p.contrincante,
          resultado: p.gano,
          id: p.id,
        }))}
        onCancelarBusqueda={onCancelarBusqueda}
        isLoading={isLoading}
        loadingHistorial={isLoadingWankingPorUsuario}
        loadingRanking={isLoadingRankingPorJuego}
        rankingData={RankingPorJuego?.map((p) => ({
          nombre: p.nombre,
          posicion: p.top,
        }))}
      />
    </>
  );
};
