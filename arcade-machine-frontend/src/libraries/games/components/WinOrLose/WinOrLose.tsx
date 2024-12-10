import { Button } from "@nextui-org/react";
import Confetti from "react-confetti";


import "./WinOrLose.css";
import { CustomModal } from "../../../../components/CustomModal.tsx";
import { useTimer } from "use-timer";
import { RenderIf } from "../../../../components/RenderIf.tsx";
import { useEffect } from "react";
import { ResultadoPartida } from "../../../../features/api/enums/ResultadoPartidaEunm.ts";

export interface WinOrLoseProps {
  oncClick?: () => void;
  isOpen?: boolean;
  win?: boolean;
  result: ResultadoPartida,
  answer?: string;
}

const resultMessages: Record<ResultadoPartida, string> = {
  [ ResultadoPartida.Derrota ]: "Fuiste humillado",
  [ ResultadoPartida.Empate ]: "Empate",
  [ ResultadoPartida.Victoria ]: "Ganaste Felicidades"
}


const getResults = (result: ResultadoPartida) => {
  return {
    message: resultMessages[ result ],
    win: result === ResultadoPartida.Victoria,
    tie: result === ResultadoPartida.Empate,
    lose: result === ResultadoPartida.Derrota
  }
}

export const WinOrLoseOrTie = ({
  oncClick,
  isOpen,
  result,
  answer
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
            <RenderIf condition={lose && !!answer}>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                La palabra correcta era:
                <h2 className="text-white text-2xl">{answer}</h2>
              </div>
            </RenderIf>
            <RenderIf condition={!!win}>
              <Confetti width={550} height={400} />
            </RenderIf>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
