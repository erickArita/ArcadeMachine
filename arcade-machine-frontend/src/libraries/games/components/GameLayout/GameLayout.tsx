import { FC } from "react";
import { Timer } from "../../../../components/Timer/Timer";
import { Score } from "../Score/Score";

import "./gameLayout.css";

export interface Score {
  name: string;
  score: number;
}

interface GameLayoutProps {
  timer: number;
  maxValue: number;
  player1: Partial<Score>;
  player2: Partial<Score>;
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
  numeroPArtida?: number;
}

export const GameLayout: FC<GameLayoutProps> = ({
  maxValue,
  timer,
  player1,
  player2,
  leftSide,
  rightSide,
  numeroPArtida,
}) => (
  <section className="flex gameLayout  pt-[150px] flex-col vh-100  relative">
    <div className="absolute w-full flex justify-center z-[1999999999999999999] top-[20rem]">
      <p className="score_value  text-gray-600  z-10 ">
        {numeroPArtida}
      </p>
    </div>
    <div className="flex justify-around   items-center z-10">
      <p className="playerName">{player1.name}</p>

      <Score scoreLeft={player1.score} scoreRight={player2.score} />

      <p className="playerName">{player2.name}</p>
    </div>
    <div className="flex flex-1 z-10">
      <div className="flex-1 h-full">{leftSide}</div>
      <div className="flex-1 h-full">{rightSide}</div>
    </div>
    <div className="justify-center px-2 z-10">
      <Timer timer={timer} maxValue={maxValue} />
    </div>
  </section>
);
