import { useNavigate } from "react-router-dom";
import { CardContainer } from "../libraries/games/components/CardContainer/CardContainer";
import { TipoJuegoEnum } from "../libraries/games/enums/TipoJuegoEnum";
import { useEffect } from "react";
import { useWaves } from "../providers/WavesProvider";
import { WaveColorEnum } from "../libraries/games/enums/waveColor";

export const Juegos = () => {
  const navigate = useNavigate();

  const handleSelectJuego = (tipoJuego: TipoJuegoEnum) => {
    navigate(`/${tipoJuego}`);
  };
  const { setWaveColor } = useWaves();
  useEffect(() => {
    setWaveColor(WaveColorEnum.BLACK);
  }, []);

  return (
    <div className="flex justify-center flex-col">
      <CardContainer titulo="Vamos a Jugaa" onSelectJuego={handleSelectJuego} />
    </div>
  );
};
