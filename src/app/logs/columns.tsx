"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"  
export type LogsTable = {
  id: any,
  date: Date,
  status: Number,
  route: string,
}

export const columns: ColumnDef<LogsTable>[] = [ 
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: () => <div>Id</div>,
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "dataFormatada",
    header: "date",
  },
  {
    accessorKey: "route",
    header: "route",
  },
  {
    accessorKey: "actions",
    id : "actions",
    cell: ({ row }) => {    
        const table_row = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(table_row.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Deletar</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
  }
]
