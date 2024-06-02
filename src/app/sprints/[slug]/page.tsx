import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface SprintsProps {
  params: {
    slug?: string;
  };
}
const getData = async (values: string) => {
  // const res = await fetch(`http://10.254.200.34:3001/corrida/${values}`);
  const res = await fetch(`http://localhost:3001/corrida/${values}`);
  return res.json();
};

export default async function Sprints({ params }: SprintsProps) {
  const sprints = await getData(params.slug as string);
  return (
    <>
      <Button className="absolute top-2.5 left-20 mt-[6px]">
        <Link
          href={`/`}
          className="flex items-center justify-center"
        >
          Voltar
        </Link>
      </Button>
      <section className="container h-40 mt-20">
        <h1 className="text-3xl text-white">Histórico de Corridas</h1>
        <div className="flex flex-col gap-4 w-full sm:w1/2 sm:flex-row mt-4">
          {sprints != "" ? (
            sprints.map((item: any) => (
              <Link href={`/live-sprints/${item.id}`}>
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>Corrida Id : {item.id}</CardTitle>
                    <CardDescription>
                      Clique para ver mais Informações
                    </CardDescription>
                    <CardContent className="p-0">
                      <p>Dispositivo Id {item.deviceId}</p>
                      <p>
                        Iniciado em{" "}
                        {format(new Date(item.date_start), "yyyy-MM-dd HH")}
                      </p>
                    </CardContent>
                  </CardHeader>
                </Card>
              </Link>
            ))
          ) : (
            <h1>Sem Corridas</h1>
          )}
        </div>
      </section>
    </>
  );
}
