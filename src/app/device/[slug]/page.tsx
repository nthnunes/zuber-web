"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface deviceProps {
    params  : {
        slug ?: string
    }
}
const Device = async ({params} : deviceProps) => {
    
    return ( 
        <section className="container h-40 mt-20">
           <h1 className="text-3xl text-white">Zuber</h1>
            <div className="flex flex-col gap-4 w-1/2 mt-4">
            <Link href={`/sprints/${params.slug}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>Consultar Histórico de Corridas</CardTitle>
                        <CardDescription>Clique para ver o histórico de corridas</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
                <Card>
                <CardHeader>
                    <CardTitle>Consulte Corridas Ao Vivo</CardTitle>
                    <CardDescription>Clique para ver as Corridas Ao Vivo</CardDescription>
                </CardHeader>
                </Card>
            </div>
        </section>
     );
}
 
export default Device;