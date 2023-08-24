import { RenderIf } from "../../../../components/RenderIf";
import { PiedraPapelTijeraEnum } from "../../../../features/api/enums/PiedraPepelTijeraEnum";
import { PptEnum } from "../../enums/pptEnum";

interface PptProps {
  jugada: PiedraPapelTijeraEnum;
  onJugada?: (jugada: PiedraPapelTijeraEnum) => void;
  isPlayer1?: boolean;
}

export const Ppt = ({ jugada, onJugada, isPlayer1 = false }: PptProps) => {
  const actionsImgs = {
    [PptEnum.Rock]: "/juego1/piedra.svg",
    [PptEnum.Paper]: "/juego1/papel.svg",
    [PptEnum.Scissors]: "/juego1/tijeras.svg",
    [PptEnum.None]: "",
  };

  const actionSelected = actionsImgs[jugada];

  const onSelected = (jugada: PiedraPapelTijeraEnum) => {
    onJugada?.(jugada);
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="h-2/3 flex justify-center items-center">
        <RenderIf condition={jugada != PiedraPapelTijeraEnum.Ninguno}>
          <img width={200} src={actionSelected} alt={actionSelected} />
        </RenderIf>
      </div>

      <div className="flex h-1/3 items-center justify-evenly px-12">
        <RenderIf condition={isPlayer1}>
          <img
            onClick={() => onSelected(PiedraPapelTijeraEnum.Piedra)}
            width={150}
            src={actionsImgs[PiedraPapelTijeraEnum.Piedra]}
            className="cursor-pointer"
          />
          <img
            width={150}
            onClick={() => onSelected(PiedraPapelTijeraEnum.Papel)}
            src={actionsImgs[PiedraPapelTijeraEnum.Papel]}
            className="cursor-pointer"
          />

          <img
            width={150}
            onClick={() => onSelected(PiedraPapelTijeraEnum.Tijera)}
            src={actionsImgs[PiedraPapelTijeraEnum.Tijera]}
            className="cursor-pointer"
          />
        </RenderIf>
      </div>
    </div>
  );
};
