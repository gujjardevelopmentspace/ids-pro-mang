import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, File } from 'lucide-react';
import { exportToExcel, exportToCSV, exportTableToPDF } from '@/utils/exportUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ExportButtonProps {
  data: Record<string, unknown>[];
  columns?: { header: string; dataKey: string }[];
  filename?: string;
  title?: string;
  formats?: ('excel' | 'csv' | 'pdf')[];
}

export const ExportButton = ({
  data,
  columns,
  filename = 'export',
  title,
  formats = ['excel', 'csv', 'pdf'],
}: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'excel' | 'csv' | 'pdf') => {
    setIsExporting(true);
    try {
      let result;

      switch (format) {
        case 'excel':
          result = exportToExcel(data, filename);
          break;
        case 'csv':
          result = exportToCSV(data, filename);
          break;
        case 'pdf':
          if (!columns) {
            // Auto-generate columns from data keys
            const autoColumns = Object.keys(data[0] || {}).map(key => ({
              header: key.charAt(0).toUpperCase() + key.slice(1),
              dataKey: key,
            }));
            result = exportTableToPDF(data, autoColumns, filename, title);
          } else {
            result = exportTableToPDF(data, columns, filename, title);
          }
          break;
      }

      if (result.success) {
        toast.success(`Exported successfully as ${format.toUpperCase()}`, {
          description: `File: ${result.filename}`,
        });
      } else {
        toast.error('Export failed', {
          description: 'Please try again',
        });
      }
    } catch (error) {
      toast.error('Export failed', {
        description: String(error),
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isExporting || !data || data.length === 0}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {formats.includes('excel') && (
          <DropdownMenuItem
            onClick={() => handleExport('excel')}
            className="cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2 text-green-500" />
            Export as Excel
          </DropdownMenuItem>
        )}
        {formats.includes('csv') && (
          <DropdownMenuItem
            onClick={() => handleExport('csv')}
            className="cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2 text-blue-500" />
            Export as CSV
          </DropdownMenuItem>
        )}
        {formats.includes('pdf') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleExport('pdf')}
              className="cursor-pointer"
            >
              <File className="w-4 h-4 mr-2 text-red-500" />
              Export as PDF
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

