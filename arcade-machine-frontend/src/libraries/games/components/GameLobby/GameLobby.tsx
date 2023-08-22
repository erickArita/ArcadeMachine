import { Button } from "@nextui-org/react";
import { UserIcon } from "../../../../components/iconst";
import { Card, CardProps } from "../Card/Card";
import {
  Historial,
  HistorialData,
  Ranking,
  RankingData,
} from "../Rankings/Rankings";

interface GameLobbyProps {
  title?: string;
  card: CardProps;
  onBuscarPartida: () => void;
  buscandoPartida: boolean;
  historialData?: HistorialData[];
  rankingData?: RankingData[];
}

export const GameLobby = ({
  card,
  onBuscarPartida,
  title = "",
  buscandoPartida,
  historialData,
  rankingData,
}: GameLobbyProps) => {
  return (
    <section className="flex flex-col gap-10">
      <h3>{title}</h3>
      <div className="flex justify-around">
        <div className="w-1/6">
          <Historial data={historialData} />
        </div>
        <div>
          <Card
            color={card.color}
            img={card.img}
            shadowColor={card.shadowColor}
            title={title}
          />
        </div>
        <div className="w-1/6">
          <Ranking data={rankingData} />
        </div>
      </div>
      <div className="self-center">
        <Button
          className="bg-gradient-to-tr
        from-pink-500
        to-yellow-500
        text-white shadow-lg"
          radius="sm"
          size="lg"
          startContent={<UserIcon />}
          onClick={onBuscarPartida}
          isLoading={buscandoPartida}
        >
          Buscar partida
        </Button>
      </div>
    </section>
  );
};
