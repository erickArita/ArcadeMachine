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
  isLoading?: boolean;
}

export const CustomTable = ({
  columns,
  rows = [],
  isLoading,
}: RankingTableProps) => {
  return (
    <Table
      className="light h-[400px]"
      bgcolor="white"
      aria-label="Example table with dynamic content"
      isHeaderSticky
      classNames={{
        base: "scrollbar-hide",
        table: "max-h-[400px]",
      }}
      
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody isLoading={isLoading}>
        {rows.map((row) => (
          <TableRow key={row?.key}>
            {(columnKey) => (
              <TableCell className="text-gray-400 ">
                {getKeyValue(row, columnKey)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
