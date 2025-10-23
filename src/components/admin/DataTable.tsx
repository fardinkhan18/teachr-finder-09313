import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
  }[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                কোনো ডেটা নেই
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <TableCell key={colIdx}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : String(row[col.accessor])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
