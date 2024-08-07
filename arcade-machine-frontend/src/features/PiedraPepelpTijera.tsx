/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useTimer } from "use-timer";
import { GameLayout } from "../libraries/games/components/GameLayout/GameLayout";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";
import { Ppt } from "../libraries/games/features/PPT/Ppt";
import { invoke, useSignalREffect } from "../providers/SignalProvider";
import { useUser } from "../libraries/auth/hooks/useUser";
import { useWaves } from "../providers/WavesProvider";
import {
  useTerminarPartidaMutation,
  useValidarGanadorMutation,
} from "./api/Partidas/partidas";
import { PiedraPapelTijeraEnum } from "./api/enums/PiedraPepelTijeraEnum";
import { ResultadoPartidaEnum } from "./api/enums/ResultadoPartidaEunm";
import { SyncronizationEnum } from "./api/enums/SyncronizationEnum";
import { TipoJugadorEnum } from "./api/enums/TipoUsuarioEnum";
import { WinOrLose } from "../libraries/games/components/WinOrLose/WinOrLose";

const validarGanador = (
  jugada1: PiedraPapelTijeraEnum,
  jugada2: PiedraPapelTijeraEnum
): ResultadoPartidaEnum => {
  const jugadas = [
    [
      ResultadoPartidaEnum.Empate,
      ResultadoPartidaEnum.Derrota,
      ResultadoPartidaEnum.Victoria,
      ResultadoPartidaEnum.Derrota,
    ],
    [
      ResultadoPartidaEnum.Victoria,
      ResultadoPartidaEnum.Empate,
      ResultadoPartidaEnum.Derrota,
      ResultadoPartidaEnum.Derrota,
    ],
    [
      ResultadoPartidaEnum.Derrota,
      ResultadoPartidaEnum.Victoria,
      ResultadoPartidaEnum.Empate,
      ResultadoPartidaEnum.Derrota,
    ],
    [
      ResultadoPartidaEnum.Derrota,
      ResultadoPartidaEnum.Derrota,
      ResultadoPartidaEnum.Derrota,
      ResultadoPartidaEnum.Derrota,
    ],
  ];
  const res = jugadas[jugada1 - 1][jugada2 - 1];

  return res;
};

interface Score {
  [key: string]: {
    score: number;
    isWinner: boolean;
  };
}

export const PiedraPepelpTijera = () => {
  const { setWaveColor } = useWaves();
  const { partidaId, tipoJugador } = useParams<{
    partidaId: string;
    tipoJugador: string;
  }>();

  const [validarResultados] = useValidarGanadorMutation();
  const [terminarPartida] = useTerminarPartidaMutation();
  const tipoJugadorParced = Number(tipoJugador) as unknown as TipoJugadorEnum;

  const { user } = useUser();

  const [jugada, setJugada] = useState<PiedraPapelTijeraEnum>(
    PiedraPapelTijeraEnum.Papel
  );
  const [jugadaOponente, setJugadaOponente] = useState<PiedraPapelTijeraEnum>(
    PiedraPapelTijeraEnum.Papel
  );

  const ref = useRef(1);

  const [timer, setTimer] = useState(10);

  const [score, setsCore] = useState<Score>({});
  const [numJudadas, setNumJudadas] = useState(0);

  const { reset, start } = useTimer({
    initialTime: 8,
    autostart: true,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver() {
      invoke(
        "SincronizarJugada",
        SyncronizationEnum.Jugada,
        partidaId as string,
        user?.userId as string,
        jugada
      );
      if (ref.current < 3) {
        setNumJudadas(numJudadas + 1);
        ref.current = ref.current + 1;
        setTimeout(() => {
          reset();
          start();
        }, 3000);
      }
    },
    onTimeUpdate(time) {
      if (tipoJugadorParced == TipoJugadorEnum.Anfitrion) {
        invoke(
          "SincronizarJugada",
          SyncronizationEnum.Timer,
          partidaId as string,
          user?.userId as string,
          time
        );
        setTimer(time);
      }
    },
  });

  const anfitrionScore = score[user?.username as string]?.score || 0;

  const invitadoScore = Object.entries(score).find(
    (s) => !s.includes(user?.username as string)
  );

  const handleValidarGanador = useCallback(
    async (jugadaOponente: PiedraPapelTijeraEnum) => {
      await validarResultados({
        jugadorId: user?.userId as string,
        partidaId: partidaId as string,
        resultado: validarGanador(jugada, jugadaOponente),
      }).unwrap();
      if (ref.current == 3) {
        console.log(user?.userId);

        await terminarPartida({
          partidaId: partidaId as string,
          jugadorId: user?.userId as string,
        }).unwrap();
      }
    },
    [jugada, partidaId, terminarPartida, user?.userId]
  );

  useSignalREffect(
    "SincronizarJugada",
    (type: SyncronizationEnum, message: number) => {
      if (type == SyncronizationEnum.Jugada) {
        setJugadaOponente(message);
        if (tipoJugadorParced == TipoJugadorEnum.Anfitrion) {
          handleValidarGanador(message);
        }
      }

      if (type == SyncronizationEnum.Timer) {
        if (tipoJugadorParced == TipoJugadorEnum.Invitado) {
          setTimer(message);
        }
      }
    },
    [handleValidarGanador, tipoJugadorParced]
  );

  useSignalREffect(
    "Score",
    (resultadoJudagoe1) => {
      setsCore(resultadoJudagoe1);
    },
    [invitadoScore]
  );

  useEffect(() => {
    setWaveColor(WaveColorEnum.PURPLE);
  }, []);
  const navigate = useNavigate();

  const onFinalizar = async () => {
    navigate(-1);
  };

  const [openResults, setopenResults] = useState(false);
  useSignalREffect(
    "TerminarPartida",
    () => {
      setopenResults(true);
    },
    []
  );

  useSignalREffect(
    "AbandonarPartida",
    () => {
      toast.error(
        "El otro jugador ha abandonado la partida, pero no te preocupes, tu eres el ganador"
      );
      navigate(-1);
    },
    [handleValidarGanador]
  );

  return (
    <>
      <GameLayout
        maxValue={10}
        player1={{
          name: user?.username,
          score: anfitrionScore,
        }}
        player2={{
          name: invitadoScore?.[0],
          score: invitadoScore?.[1].score || 0,
        }}
        leftSide={<Ppt isPlayer1 onJugada={setJugada} jugada={jugada} />}
        rightSide={<Ppt jugada={jugadaOponente} />}
        timer={timer}
        numeroPArtida={numJudadas}
      />
      <WinOrLose
        isOpen={openResults}
        oncClick={onFinalizar}
        win={anfitrionScore > (invitadoScore?.[1]?.score || 0)}
      />
    </>
  );
};
