import { Card } from "../Card/Card";

export const CardContainer = () => {
  return (
    <section className="grid flex-1 justify-center h-full auto-rows-auto">
      <div>
        <h1 className="  font-bold text-3xl text-center	 text-black ">
          Vamoo a Juga
        </h1>
      </div>
      <div className="pb-20 grid grid-cols-3  max-w-7xl   gap-32  row-span-4 ">
        <div className="grid  items-end">
          <Card
            color="#9b57f0"
            img="/piedra.png"
            shadowColor="#dcc1fd"
            title="Piedra Papel Tijera"
          />
        </div>
        <div className="grid items-start">
          <Card
            color="#ffb900"
            img="/ahorcado.png"
            shadowColor="#ffe49e"
            title="Piedra Papel Tijera"
          />
        </div>
        <div className="grid  items-end">
          <Card
            color="#dd2bbc"
            img="dinosaurio.png"
            shadowColor="#fba4ea"
            title="Piedra Papel Tijera"
          />
        </div>
      </div>
    </section>
  );
};
