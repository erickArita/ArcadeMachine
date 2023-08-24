import { Button, CircularProgress } from "@nextui-org/react";
import { useState } from "react";
import { Loader } from "../../../../components/Loader";
import { RenderIf } from "../../../../components/RenderIf";
import { Card, CardProps } from "../Card/Card";
import {
  Historial,
  HistorialData,
  Ranking,
  RankingData,
} from "../Rankings/Rankings";

interface GameLobbyProps {
  title?: string;
  card: Partial<CardProps>;
  onBuscarPartida: () => void;
  buscandoPartida: boolean;
  historialData?: HistorialData[];
  rankingData?: RankingData[];
  isLoading?: boolean;
  onCancelarBusqueda?: () => void;
  loadingHistorial?: boolean;
  loadingRanking?: boolean;
}

export const GameLobby = ({
  card,
  onBuscarPartida,
  title = "",
  buscandoPartida,
  historialData,
  rankingData,
  isLoading,
  onCancelarBusqueda,
  loadingHistorial,
  loadingRanking,
}: GameLobbyProps) => {
  const [busqueda, setBusqueda] = useState(false);

  const handleBuscarPartida = () => {
    if (busqueda) {
      onCancelarBusqueda?.();
      setBusqueda(false);
    } else {
      onBuscarPartida();
      setBusqueda(true);
    }
  };

  return (
    <section className="flex flex-col gap-10 bg-white">
      <Loader isLoading={isLoading}>
        <h3 className="text-center text-black font-semibold text-2xl">
          {title}
        </h3>
        <div className="flex justify-around">
          <div className="w-1/6">
            <Historial data={historialData} loading={loadingHistorial} />
          </div>
          <div>
            <Card
              color={card?.color}
              img={card?.img}
              shadowColor={card?.shadowColor}
              title={title}
            />
          </div>
          <div className="w-1/6">
            <Ranking data={rankingData} loading={loadingRanking} />
          </div>
        </div>
        <div className="self-center">
          <Button
            className="bg-gradient-to-tr
          from-pink-500
          to-yellow-500
          text-white shadow-lg"
            radius="sm"
            startContent={
              <RenderIf condition={!!buscandoPartida}>
                <CircularProgress
                  size="sm"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                />
              </RenderIf>
            }
            size="lg"
            onClick={handleBuscarPartida}
          >
            {busqueda ? "Cancelar" : "Buscar partida"}
          </Button>
        </div>
      </Loader>
    </section>
  );
};
