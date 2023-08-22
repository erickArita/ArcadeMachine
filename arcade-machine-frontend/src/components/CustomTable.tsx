import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

export interface Column {
  key: string;
  label: string;
}

export interface Row {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface RankingTableProps {
  columns: Column[];
  rows?: Row[];
}

export const CustomTable = ({ columns, rows = [] }: RankingTableProps) => {
  return (

    <Table
      className="light"
      bgcolor="white"
      aria-label="Example table with dynamic content"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row?.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
