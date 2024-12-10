import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContainer } from "../../libraries/games/components/CardContainer/CardContainer";
import { WaveColorEnum } from "../../libraries/games/enums/waveColor";
import { useWaves } from "../../providers/WavesProvider";
import { useObtenerJuegosQuery } from "../api/Partidas/partidas";

export const Juegos = () => {
  const navigate = useNavigate();
  const { data: juegos, isLoading, isFetching } = useObtenerJuegosQuery();

  const handleSelectJuego = (tipoJuego: string) => {
    navigate(`/${tipoJuego}`);
  };
  const { setWaveColor } = useWaves();
  useEffect(() => {
    setWaveColor(WaveColorEnum.PURPLE);
  }, []);

  return (
    <div className="flex justify-center flex-col h-full">
      <CardContainer
        titulo="Vamos a Jugaa"
        isLoading={isLoading || isFetching}
        miniJuegos={juegos}
        onSelectJuego={handleSelectJuego}
      />
    </div>
  );
};
