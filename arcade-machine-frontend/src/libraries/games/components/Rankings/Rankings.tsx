import { Column, CustomTable } from "../../../components/CustomTable";

const rankingCols: Column[] = [
  {
    key: "posicion",
    label: "Posición",
  },
  {
    key: "nombre",
    label: "Nombre",
  },
];

interface RankingTableProps<T> {
  data: T[];
}

interface RankingData {
  posicion: number;
  nombre: string;
}

export const Ranking = ({ data }: RankingTableProps<RankingData>) => {
  return <CustomTable columns={rankingCols} rows={data} />;
};

const historialCols: Column[] = [
  {
    key: "resultado",
    label: "Resultado",
  },
  {
    key: "contrincante",
    label: "Contrincante",
  },
];

interface HistorialData {
  resultado: string;
  contrincante: string;
}

export const Historial = ({ data }: RankingTableProps<HistorialData>) => {
  return <CustomTable columns={historialCols} rows={data} />;
};
