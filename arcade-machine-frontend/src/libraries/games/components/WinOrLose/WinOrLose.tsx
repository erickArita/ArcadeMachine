import { Button } from "@nextui-org/react";
import Confetti from "react-confetti";

export interface WinOrLoseProps {
  oncClick?: () => void;
  isOpen?: boolean;
  win?: boolean;
}

import "./WinOrLose.css";
import { CustomModal } from "../../../../components/CustomModal.tsx";
import { useTimer } from "use-timer";
import { RenderIf } from "../../../../components/RenderIf.tsx";
import { useEffect } from "react";

export const WinOrLose = ({
  oncClick,
  isOpen,
  win = false,
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
    if (isOpen) start();
  }, [isOpen]);

  return (
    <CustomModal isOpen={isOpen} size={"xl"}>
      <div className="WinOrLose h-[300px] flex justify-center items-center ">
        <div className="flex flex-col  gap-[2rem]">
          <h2 className="text-gray-500  text-5xl">
            {win ? "Ganaste Felicidades" : "Fuiste humillado"}
          </h2>
          <div className="flex justify-center flex-col">
            <div className="relative flex justify-center">
              <RenderIf condition={!!win}>
                <img src="/GanarPerder/ganar.gif" width={100} alt="" />
                <img src="/GanarPerder/ganar.gif" width={100} alt="" />
                <img src="/GanarPerder/ganar.gif" width={100} alt="" />
              </RenderIf>
              <RenderIf condition={!win}>
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
