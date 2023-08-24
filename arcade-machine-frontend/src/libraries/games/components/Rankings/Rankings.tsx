import { Column, CustomTable } from "../../../../components/CustomTable";

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
  data?: T[];
  loading?: boolean;
}

export interface RankingData {
  posicion: number;
  nombre: string;
}

export const Ranking = ({ data, loading }: RankingTableProps<RankingData>) => {
  return <CustomTable columns={rankingCols} rows={data} isLoading={loading} />;
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

export interface HistorialData {
  id?: string;
  resultado?: boolean;
  contrincante?: string;
}

export const Historial = ({
  data,
  loading,
}: RankingTableProps<HistorialData>) => {
  return (
    <CustomTable columns={historialCols} rows={data} isLoading={loading} />
  );
};
