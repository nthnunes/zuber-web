"use server"
import { db } from "../src/lib/db";

function convertToDateOnly(isoString : any) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa de 0
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getLogs = async () => {
    try {

        const log = await db.logs.findMany({})

        return log;

    }catch(error){
        return null
    }
}


export const getFilteredLogs = async (startDate : any, endDate : any) => {
    const startDateISO  = convertToDateOnly(startDate);
    const endDateISO  = convertToDateOnly(endDate);

    // Ajusta startDate para o início do dia
    const startOfDay = new Date(startDateISO);
    startOfDay.setUTCHours(0, 0, 0, 0); // 00:00:00.000 UTC

    // Ajusta endDate para o final do dia
    const endOfDay = new Date(endDateISO);
    endOfDay.setUTCHours(23, 59, 59, 999); // 23:59:59.999 UTC

    try {
        const log = await db.logs.findMany({
            where : {
                date : {
                    gte:startOfDay,
                    lte:endOfDay,
                }
            }
        })

        return log;


    }catch(error){
        return null
    }
}