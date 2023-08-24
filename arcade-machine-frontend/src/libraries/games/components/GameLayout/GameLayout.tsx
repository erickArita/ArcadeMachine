import { FC } from "react";
import { Timer } from "../../../../components/Timer/Timer";
import { Score } from "../Score/Score";

import "./gameLayout.css";

interface GameLayoutProps {
  timer: number;
  maxValue: number;
  player1: {
    name: string;
    score: number;
  };
  player2: {
    name: string;
    score: number;
  };
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({
  maxValue,
  timer,
  player1,
  player2,
  leftSide,
  rightSide,
}) => (
  <section className="flex gameLayout  pt-[150px] flex-col vh-100 ">
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
