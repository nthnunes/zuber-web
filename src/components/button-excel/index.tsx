import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from '../ui/button';
import { Sheet } from 'lucide-react';

const ExportToExcelButton = ({ data, filename } : any) => {
  const exportToExcel = () => {
    // Criar um workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Gerar um buffer
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Salvar o arquivo
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
  };

  return (
    <Button onClick={exportToExcel} className='self-end w-full sm:w-fit p-4'>
      <Sheet size={15} className='m-1' /> Excel
    </Button>
  );
};

export default ExportToExcelButton;
