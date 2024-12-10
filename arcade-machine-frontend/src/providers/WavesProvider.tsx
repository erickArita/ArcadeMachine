import { PropsWithChildren, createContext, useContext, useState } from "react";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";

interface WavesContextData {
  waveColor: WaveColorEnum;
  setWaveColor: (color: WaveColorEnum) => void;
}

const WavesContext = createContext({} as WavesContextData);

export const useWaves = () => {
  const context = useContext(WavesContext);

  if (!context) {
    throw new Error("useWaves debe ser usado dentro de WavesProvider");
  }

  return context;
};

export const WavesProvider = ({ children }: PropsWithChildren) => {
  const [wave, setWave] = useState<WaveColorEnum>(WaveColorEnum.WHITE);

  return (
    <WavesContext.Provider
      value={{
        waveColor: wave,
        setWaveColor: setWave,
      }}
    >
      {children}
    </WavesContext.Provider>
  );
};
