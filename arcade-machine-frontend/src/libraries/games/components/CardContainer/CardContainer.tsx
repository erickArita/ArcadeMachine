import { Loader } from "../../../../components/Loader";
import { Minijuego } from "../../../../features/api/Partidas/models/Minijuego";
import { Card } from "../Card/Card";

interface CardContainerProps {
  titulo: string;
  onSelectJuego?: (juegoId: string) => void;
  miniJuegos?: Minijuego[];
  isLoading?: boolean;
}

export const CardContainer = ({
  titulo,
  onSelectJuego,
  miniJuegos,
  isLoading,
}: CardContainerProps) => {
  return (
    <Loader isLoading={!!isLoading}>
      <section className="grid flex-1 justify-center h-full auto-rows-auto">
        <div>
          <h1 className="  font-bold text-3xl text-center	 text-black ">
            {titulo}
          </h1>
        </div>
        <div className="pb-20 grid grid-cols-2  max-w-7xl   gap-32  row-span-4  ">
          {miniJuegos?.map((minijuego) => (
            <div key={minijuego.id}>
              <Card
                color={minijuego.color}
                img={minijuego.img}
                shadowColor={minijuego.shadowColor}
                title={minijuego.nombre}
                oncClick={() => {
                  return onSelectJuego?.(minijuego.slug);
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </Loader>
  );
};
