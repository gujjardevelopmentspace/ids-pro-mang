import { ReactNode } from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (value: unknown, row: Record<string, unknown>) => ReactNode;
  mobileLabel?: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onRowClick?: (row: Record<string, unknown>) => void;
}

export const ResponsiveTable = ({ columns, data, onRowClick }: ResponsiveTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-foreground">
                    {column.cell
                      ? column.cell(row[column.accessor], row)
                      : String(row[column.accessor] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            onClick={() => onRowClick?.(row)}
            className={`bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all ${
              onRowClick ? 'cursor-pointer active:scale-98' : ''
            }`}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex justify-between items-start py-2 border-b border-border last:border-0">
                <span className="text-sm font-medium text-muted-foreground w-1/3">
                  {column.mobileLabel || column.header}:
                </span>
                <span className="text-sm text-foreground w-2/3 text-right">
                  {column.cell
                    ? column.cell(row[column.accessor], row)
                    : String(row[column.accessor] || '')}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

