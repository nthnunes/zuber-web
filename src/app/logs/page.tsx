"use client"
import { LogsTable, columns } from "./columns"
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { format } from "date-fns";
import FilterComponent from "./FilterComponent";
import { useEffect, useState } from "react";
import { getFilteredLogs, getLogs } from "../../../data/fetchLogs";
import ExportToExcelButton from "@/components/button-excel";

const Logs =  () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    function formatarData(data : any) {
        return format(new Date(data), 'dd/MM/yyyy');
    }

    const fetchData = async (filter = '') => {
        try {
            const log = await getLogs()
            .then(data => {
                const newArray = data?.map(item => ({
                    ...item,
                    dataFormatada: formatarData(item.date)
                }));
                setData(newArray as any);  // Atualiza o estado com os dados filtrados
            })
          
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };

      const fetchData2 = async ({startDate,endDate} : any) => {

        try {
            const log2 = await getFilteredLogs(startDate,endDate)
            .then(data => {
                const newArray = data?.map(item => ({
                    ...item,
                    dataFormatada: formatarData(item.date)
                }));
                setData(newArray as any);  // Atualiza o estado com os dados filtrados
            })
          
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
      
      useEffect(() => {
        fetchData();  // Busca os dados quando o componente é montado
      }, []);
      const handleFilterChange = (newFilter: any) => {
      
        const startDate = newFilter.startDate
        const endDate = newFilter.endDate
        setFilter(newFilter);  // Atualiza o estado do filtro
        fetchData2(newFilter)
      };
    
    return ( 
        <div className="container mx-auto py-10 flex flex-col gap-4 sm:gap-0">
            <FilterComponent 
            onFilterChange={handleFilterChange}
           />
           <ExportToExcelButton data={data} filename={'logs'}/>
            <DataTable columns={columns} data={data} />
        </div>
     );
}
 
export default Logs;