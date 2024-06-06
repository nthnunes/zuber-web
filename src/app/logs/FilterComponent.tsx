// app/components/FilterComponent.tsx
'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"

import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { CalendarIcon, Filter } from 'lucide-react';

interface FilterComponentProps {
  onFilterChange: (filter: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange } : any) => {
  const [filter, setFilter] = useState<any>('');

  const handleFilterChange = (data: z.infer<typeof FormSchema>) => {
    setFilter(data);  // Atualiza o estado local do filtro
    onFilterChange(data);  // Chama a função passada como prop para notificar o componente pai
  };
  const FormSchema = z.object({
    startDate: z.date({
      required_error: "A startDate is required.",
    }),
    endDate: z.date({
      required_error: "A endDate is required.",
    }),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleFilterChange(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col  flex items-center gap-4 sm:flex-row md:flex-row md:w-fit">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full sm:w-[240px]">
              <FormLabel>Data início</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal w-full sm:w-[240px]",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Selecione uma data início</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(startDate) =>
                      startDate > new Date() || startDate < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full sm:w-[240px]">
              <FormLabel>Data fim</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal w-full sm:w-[240px]",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Selecione uma data fim</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(endDate) =>
                      endDate > new Date() || endDate < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col w-full sm:flex-row sm:w-fit md:flex-row md:w-fit gap-4 self-end'>
          <Button type="submit" className='self-end w-full sm:w-fit p-4'><Filter size={"15"} className='m-1'/>Filtrar</Button>
        </div>
      </form>
    </Form>
  );
};

export default FilterComponent;
