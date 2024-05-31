
import { db } from "@/lib/db";
const Logs = async () => {
    const log = await db.logs.findMany({})
    console.log(log);
    
    return ( 
        <section className="container mt-40 flex items-center justify-center">
            {log.map((e)=>(
                <p>{e.id}</p>
            ))}
        </section>
     );
}
 
export default Logs;