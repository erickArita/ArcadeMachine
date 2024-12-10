import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../libraries/auth/hooks/useUser";
import { GameLobby } from "../../libraries/games/components/GameLobby/GameLobby";
import { invoke, useSignalREffect } from "../../providers/SignalProvider";
import { useWaves } from "../../providers/WavesProvider";
import { speak } from "../../utils/speechUtil";
import {
  useLazyEmparejarQuery,
  useObtenerJuegoPorIdQuery,
} from "../api/Partidas/partidas";
import {
  useRankingPorJuegoQuery,
  useWankingPorUsuarioQuery,
} from "../api/rankings/rankings";

export const GameLobbyFeature = () => {
  const { tipoJuego } = useParams<{ tipoJuego: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: juego, isLoading } = useObtenerJuegoPorIdQuery(
    {
      slug: tipoJuego,
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
      speak("   Partida encontrada");


      setTimeout(() => {
        navigate(`partida/${partidaId}/${tipoJugador}`);
      }, 1000);
    },
    []
  );

  const onEmparejar = () => {
    if(!user || !tipoJuego) return;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    emparejarQuery({ userId: user.userId, juegoId: juego?.id!, ia: juego?.metadata.ia });
    setBuscandoPartida(true);
  };

  const onCancelarBusqueda = () => {
    invoke("AbandonarPartida", user?.userId);
    setBuscandoPartida(false);
  };

  const { data: RankingPorJuego, isLoading: isLoadingRankingPorJuego } =
    useRankingPorJuegoQuery(
      { juegoId: juego?.id },
      {
        skip: !juego?.id,
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: WankingPorUsuario, isLoading: isLoadingWankingPorUsuario } =
    useWankingPorUsuarioQuery(
      { juegoId: juego?.id, jugadorId: user?.userId },
      {
        skip: !user?.userId || !juego?.id,
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    if(juego?.metadata.waveColor)
      setWaveColor(juego?.metadata.waveColor);
  }, [ juego?.metadata.waveColor ]);

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
