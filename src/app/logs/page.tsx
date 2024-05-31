import { LogsTable, columns } from "./columns"
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
const Logs = async () => {
    const log = await db.logs.findMany({})

    return ( 
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={log} />
        </div>
     );
}
 
export default Logs;