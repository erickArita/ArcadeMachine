import { useNavigate } from "react-router-dom";
import { CardContainer } from "../libraries/games/components/CardContainer/CardContainer";
import { TipoJuegoEnum } from "../libraries/games/enums/TipoJuegoEnum";

export const Juegos = () => {
  const navigate = useNavigate();

  const handleSelectJuego = (tipoJuego: TipoJuegoEnum) => {
    navigate(`/${tipoJuego}`);
  };

  return (
    <div className="flex justify-center flex-col">
      <CardContainer titulo="Vamos a Jugaa" onSelectJuego={handleSelectJuego} />
    </div>
  );
};
