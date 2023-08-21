import { Button } from "@nextui-org/react";
import { CardContainer } from "../libraries/games/CardContainer/CardContainer";
import { useSignalREffect } from "../providers/SignalProvider";
import { useLazyEmparejarQuery } from "./api/partidas";
import { useUser } from "../providers/UserProvider";
import { useState } from "react";

export const Juegos = () => {
  const { user } = useUser();
  const [emparejarQuery] = useLazyEmparejarQuery();
  const [buscandoPartida, setBuscandoPartida] = useState(false);

  useSignalREffect(
    "Match",
    (message) => {
      console.log(message);
      setBuscandoPartida(false);
    },
    []
  );

  const onEmparejar = () => {
    if (!user) return;
    emparejarQuery({ userId: user.userId });
    setBuscandoPartida(true);
  };

  return (
    <div className="flex justify-center flex-col">
      <CardContainer titulo="Vamos a Jugaa" />
      <Button isLoading={buscandoPartida} onClick={onEmparejar}>
        Buscar partida
      </Button>
    </div>
  );
};
