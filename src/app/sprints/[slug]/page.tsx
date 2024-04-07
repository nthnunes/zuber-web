
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';

interface SprintsProps {
    params  : {
        slug ?: string
    }
}
const getData = async (values : string) => {
   const res = await fetch( `http://localhost:3001/corrida/${values}`)
   return res.json()
}

export default async function Sprints ({params} : SprintsProps)  {
   const sprints = await getData(params.slug as string)
    return ( 
        <>
            <Button className="m-4"><Link href={`/device/${params.slug}`} className="flex items-center justify-center"><ChevronLeft />Voltar</Link></Button>
            <section className="container h-40 mt-20">
            <h1 className="text-3xl text-white">Histórico de Corridas</h1>
            <div className="flex flex-col gap-4 w-full sm:w1/2 sm:flex-row mt-4">
                {sprints != '' ? ( sprints.map((item : any) => (
                        <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>Corrida Id : {item.id}</CardTitle>
                            <CardDescription>Clique para ver mais Informações</CardDescription>
                            <CardContent className="p-0">
                                <p>Dispositivo Id {item.deviceId}</p>
                                <p>Iniciado em {format(new Date(item.date_start), 'yyyy-MM-dd HH')}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))) : (
                        <h1>Sem Corridas</h1>
                    )
                }
            </div>
            </section>
        </>
     );
}
 
