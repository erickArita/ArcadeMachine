/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTimer } from "use-timer";
import { GameLayout } from "../libraries/games/components/GameLayout/GameLayout";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";
import { Ppt } from "../libraries/games/features/PPT/Ppt";
import { invoke, useSignalREffect } from "../providers/SignalProvider";
import { useUser } from "../providers/UserProvider";
import { useWaves } from "../providers/WavesProvider";
import { PiedraPapelTijeraEnum } from "./api/enums/PiedraPepelTijeraEnum";
import { ResultadoPartidaEnum } from "./api/enums/ResultadoPartidaEunm";
import { SyncronizationEnum } from "./api/enums/SyncronizationEnum";
import { TipoJugadorEnum } from "./api/enums/TipoUsuarioEnum";
import { useValidarGanadorMutation } from "./api/Partidas/partidas";

const validarGanador = (
  jugada1: PiedraPapelTijeraEnum,
  jugada2: PiedraPapelTijeraEnum
): ResultadoPartidaEnum => {
  const jugadas = {
    [PiedraPapelTijeraEnum.Piedra]: {
      [PiedraPapelTijeraEnum.Piedra]: ResultadoPartidaEnum.Empate,
      [PiedraPapelTijeraEnum.Tijera]: ResultadoPartidaEnum.Victoria,
      [PiedraPapelTijeraEnum.Papel]: ResultadoPartidaEnum.Derrota,
    },
    [PiedraPapelTijeraEnum.Papel]: {
      [PiedraPapelTijeraEnum.Papel]: ResultadoPartidaEnum.Empate,
      [PiedraPapelTijeraEnum.Piedra]: ResultadoPartidaEnum.Victoria,
      [PiedraPapelTijeraEnum.Tijera]: ResultadoPartidaEnum.Derrota,
    },
    [PiedraPapelTijeraEnum.Tijera]: {
      [PiedraPapelTijeraEnum.Tijera]: ResultadoPartidaEnum.Empate,
      [PiedraPapelTijeraEnum.Papel]: ResultadoPartidaEnum.Victoria,
      [PiedraPapelTijeraEnum.Piedra]: ResultadoPartidaEnum.Derrota,
    },
  };

 // @ts-ignore
  return jugadas[jugada1][jugada2];
};

export const PiedraPepelpTijera = () => {
  const { setWaveColor } = useWaves();
  const { partidaId, tipoJugador } = useParams<{
    partidaId: string;
    tipoJugador: string;
  }>();

  const [validarResultados] = useValidarGanadorMutation();
  const tipoJugadorParced = Number(tipoJugador) as unknown as TipoJugadorEnum;

  const { user } = useUser();

  const [jugada, setJugada] = useState<PiedraPapelTijeraEnum>(
    PiedraPapelTijeraEnum.Ninguno
  );
  const [jugadaOponente, setJugadaOponente] = useState<PiedraPapelTijeraEnum>(
    PiedraPapelTijeraEnum.Ninguno
  );

  const [timer, setTimer] = useState(10);

  useTimer({
    initialTime: 10,
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

  const handleValidarGanador = async (
    jugadaOponente: PiedraPapelTijeraEnum
  ) => {
    validarResultados({
      jugadorId: user?.userId as string,
      partidaId: partidaId as string,
      resultado: validarGanador(jugada, jugadaOponente),
    });
  };

  useSignalREffect(
    "SincronizarJugada",
    (type: SyncronizationEnum, message: number) => {
      if (type == SyncronizationEnum.Jugada) {
        console.log(message);
        setJugadaOponente(message);
        if (
          (message as unknown as PiedraPapelTijeraEnum) ==
          PiedraPapelTijeraEnum.Ninguno
        )
          return;
        if (tipoJugadorParced == TipoJugadorEnum.Anfitrion) {
          handleValidarGanador(message);
        }
      }

      if (tipoJugadorParced == TipoJugadorEnum.Invitado) {
        if (type == SyncronizationEnum.Timer) {
          setTimer(message);
        }
      }
    },
    []
  );

  useSignalREffect(
    "Score",
    (resultadoJudagoe1: number, resultadoJugado2: number) => {
      console.log(resultadoJudagoe1, resultadoJugado2);
    },
    []
  );

  useEffect(() => {
    setWaveColor(WaveColorEnum.PURPLE);
  }, []);

  return (
    <GameLayout
      maxValue={10}
      player1={{
        name: "Player 1",
        score: 0,
      }}
      player2={{
        name: "Player 2",
        score: 0,
      }}
      leftSide={<Ppt isPlayer1 onJugada={setJugada} jugada={jugada} />}
      rightSide={<Ppt jugada={jugadaOponente} />}
      timer={timer}
    />
  );
};
