import { Button } from "@nextui-org/react";
import Confetti from "react-confetti";


import "./WinOrLose.css";
import { CustomModal } from "../../../../components/CustomModal.tsx";
import { useTimer } from "use-timer";
import { RenderIf } from "../../../../components/RenderIf.tsx";
import { useEffect } from "react";
import { ResultadoPartidaEnum } from "../../../../features/api/enums/ResultadoPartidaEunm.ts";

export interface WinOrLoseProps {
  oncClick?: () => void;
  isOpen?: boolean;
  win?: boolean;
  result: ResultadoPartidaEnum
}

const resultMessages: Record<ResultadoPartidaEnum, string> = {
  [ ResultadoPartidaEnum.Derrota ]: "Fuiste humillado",
  [ ResultadoPartidaEnum.Empate ]: "Empate",
  [ ResultadoPartidaEnum.Victoria ]: "Ganaste Felicidades"
}


const getResults = (result: ResultadoPartidaEnum) => {
  return {
    message: resultMessages[ result ],
    win: result === ResultadoPartidaEnum.Victoria,
    tie: result === ResultadoPartidaEnum.Empate,
    lose: result === ResultadoPartidaEnum.Derrota
  }
}

export const WinOrLoseOrTie = ({
  oncClick,
  isOpen,
  result
}: WinOrLoseProps) => {
  const { time, start } = useTimer({
    initialTime: 15,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver() {
      oncClick?.();
    },
  });

  useEffect(() => {
    if(isOpen) start();
  }, [ isOpen ]);


  const { lose, message, tie, win } = getResults(result)
  return (
    <CustomModal isOpen={isOpen} size={"xl"}>
      <div className="WinOrLose h-[300px] flex justify-center items-center ">
        <div className="flex flex-col  gap-[2rem]">
          <h2 className="text-gray-500  text-5xl">
            {message}
          </h2>
          <div className="flex justify-center flex-col">
            <div className="relative flex justify-center">
              <RenderIf condition={win}>
                <img src="/GanarPerder/ganar.gif" width={100} alt="" />
                <img src="/GanarPerder/ganar.gif" width={100} alt="" />
                <img src="/GanarPerder/ganar.gif" width={100} alt="" />
              </RenderIf>
              <RenderIf condition={lose || tie}>
                <img src="/GanarPerder/perder.gif" width={100} alt="" />
                <img src="/GanarPerder/perder.gif" width={100} alt="" />
                <img src="/GanarPerder/perder.gif" width={100} alt="" />
              </RenderIf>
            </div>
            <Button
              className="bg-gradient-to-tr
            from-pink-500
            to-yellow-500
            text-white shadow-lg mt-1"
              radius="sm"
              size="lg"
              onClick={oncClick}
            >
              {time} Volver al lobby
            </Button>
            <RenderIf condition={!!win}>
              <Confetti width={550} height={400} />
            </RenderIf>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
