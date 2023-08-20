import { Card } from "../Card/Card";

export const CardContainer = () => {
  return (
    <div
      className="h-full
          grid-cols-3
    "
    >
      <Card color="#9b57f0" img="/ahorcado.png" shadowColor="#dcc1fd" title="Piedra Papel Tijera"  />
      <Card color="#9b57f0" img="" shadowColor="#dcc1fd" title="Piedra Papel Tijera"  />
      <Card color="#9b57f0" img="" shadowColor="#dcc1fd" title="Piedra Papel Tijera"  />
    </div>
  );
};
