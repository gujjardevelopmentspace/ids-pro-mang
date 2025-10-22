import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Export data to Excel
export const exportToExcel = (data: Record<string, unknown>[], filename: string = 'export') => {
  try {
    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const fullFilename = `${filename}_${timestamp}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, fullFilename);
    
    return { success: true, filename: fullFilename };
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return { success: false, error };
  }
};

// Export data to CSV
export const exportToCSV = (data: Record<string, unknown>[], filename: string = 'export') => {
  try {
    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Convert worksheet to CSV string
    const csv = XLSX.utils.sheet_to_csv(ws);
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().split('T')[0];
    const fullFilename = `${filename}_${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fullFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, filename: fullFilename };
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    return { success: false, error };
  }
};

// Export table to PDF
export const exportTableToPDF = (
  data: Record<string, unknown>[],
  columns: { header: string; dataKey: string }[],
  filename: string = 'export',
  title?: string
) => {
  try {
    const doc = new jsPDF();
    
    // Add title if provided
    if (title) {
      doc.setFontSize(18);
      doc.text(title, 14, 20);
    }

    // Prepare table headers and rows
    const headers = columns.map(col => col.header);
    const rows = data.map(item => 
      columns.map(col => String(item[col.dataKey] || ''))
    );

    // Generate table
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: title ? 30 : 10,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [40, 163, 163], // Primary teal color
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add footer with date and page numbers
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        14,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Save the PDF
    const timestamp = new Date().toISOString().split('T')[0];
    const fullFilename = `${filename}_${timestamp}.pdf`;
    doc.save(fullFilename);
    
    return { success: true, filename: fullFilename };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return { success: false, error };
  }
};

// Export chart as PDF (with chart image)
export const exportChartToPDF = async (
  chartElement: HTMLElement,
  filename: string = 'chart',
  title?: string
) => {
  try {
    // You would need html2canvas for this
    // npm install html2canvas
    // import html2canvas from 'html2canvas';
    
    // const canvas = await html2canvas(chartElement);
    // const imgData = canvas.toDataURL('image/png');
    
    const doc = new jsPDF();
    
    if (title) {
      doc.setFontSize(18);
      doc.text(title, 14, 20);
    }

    // Add the chart image
    // doc.addImage(imgData, 'PNG', 10, 30, 190, 100);

    // Add timestamp
    doc.setFontSize(8);
    doc.text(
      `Generated on ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.getHeight() - 10
    );

    const timestamp = new Date().toISOString().split('T')[0];
    const fullFilename = `${filename}_${timestamp}.pdf`;
    doc.save(fullFilename);
    
    return { success: true, filename: fullFilename };
  } catch (error) {
    console.error('Error exporting chart to PDF:', error);
    return { success: false, error };
  }
};

// Export complex report with multiple sections
export const exportComplexReport = (
  sections: {
    title: string;
    data: Record<string, unknown>[];
    columns: { header: string; dataKey: string }[];
  }[],
  filename: string = 'report',
  reportTitle?: string
) => {
  try {
    const doc = new jsPDF();
    let currentY = 10;

    // Add main title
    if (reportTitle) {
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(reportTitle, 14, currentY);
      currentY += 15;
    }

    // Add each section
    sections.forEach((section, index) => {
      // Check if we need a new page
      if (currentY > 250) {
        doc.addPage();
        currentY = 10;
      }

      // Section title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(section.title, 14, currentY);
      currentY += 10;

      // Section table
      const headers = section.columns.map(col => col.header);
      const rows = section.data.map(item => 
        section.columns.map(col => String(item[col.dataKey] || ''))
      );

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: currentY,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [40, 163, 163],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { left: 14, right: 14 },
      });

      currentY = (doc as any).lastAutoTable.finalY + 15;
    });

    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      doc.text(
        `Generated on ${new Date().toLocaleString()}`,
        14,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const fullFilename = `${filename}_${timestamp}.pdf`;
    doc.save(fullFilename);
    
    return { success: true, filename: fullFilename };
  } catch (error) {
    console.error('Error exporting complex report:', error);
    return { success: false, error };
  }
};

