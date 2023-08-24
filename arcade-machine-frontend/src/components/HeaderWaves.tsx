import { WaveColorEnum } from "../libraries/games/enums/waveColor";

interface HeaderWavesProps {
  color?: WaveColorEnum;
}

export const HeaderWaves = ({ color }: HeaderWavesProps) => {
  const waves = {
    [WaveColorEnum.WHITE]: "/WaveBlanca.svg",
    [WaveColorEnum.BLACK]: "/WaveNegra.svg",
    [WaveColorEnum.PURPLE]: "/wavePurple.svg",
    [WaveColorEnum.YELLOW]: "/waveYellow.svg",
    [WaveColorEnum.PINK]: "/wavePink.svg",
  };

  return (
    <img
      width="100%"
      src={waves[color || WaveColorEnum.BLACK]}
      className="absolute top-0 w-full z-10"
    />
  );
};
