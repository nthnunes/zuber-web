import { LogsTable, columns } from "./columns"
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { format } from "date-fns";
const Logs = async () => {
    const log = await db.logs.findMany({})

    function formatarData(data : any) {
        return format(new Date(data), 'dd/MM/yyyy');
    }
    const newArray = log.map(item => ({
        ...item,
        dataFormatada: formatarData(item.date)
    }));

    return ( 
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={newArray} />
        </div>
     );
}
 
export default Logs;