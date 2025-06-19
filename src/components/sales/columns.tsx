import { Sale } from "@/types/sales/sale";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { useDeleteSale } from "@/hooks/products/sales/delete-sale";
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog";
import { Checkbox } from "../ui/checkbox";
import { usePaidSale } from "@/hooks/products/sales/change-sale-paid-status";
import { useState } from "react";
import { EditSaleDialog } from "./edit-sale-dialog";

export const salesColumns: ColumnDef<Sale>[] = [

  {
    accessorKey: "productLogo",
    header: "",
    cell: ({ row }) => {
      const logo = row.original.productLogo
      if (!logo) return null
      return (
        <img src={logo} alt="Logo do produto" className="w-14 h-12 rounded-full object-cover" />
      )
    }
  },
  {
    accessorKey: "productName",
    header: "Produto",

  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "sellPrice",
    header: "Preço de Venda",
    cell: ({ row }) => {
      const sellPrice = row.original.sellPrice
      return (
        <span className="font-medium">R$ {sellPrice}</span>
      )
    },
  },
  {
    accessorKey: "totalRevenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Vendido
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const totalSpent = row.original.totalRevenue
      return (
        <span className="font-medium">R$ {totalSpent}</span>
      )
    },
  },
  {
    accessorKey: "saleDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data da Venda
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const saleDate = row.original.saleDate
      const date = new Date(saleDate)
      return (
        <span>{date.toLocaleDateString()}</span>
      )
    }
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
  },
  {
    accessorKey: "paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status Pagamento
          <ArrowUpDown />
        </Button>
      )
    },
    
    cell: function Cell({ row }) {
      const { mutateAsync: paySale } = usePaidSale()
      const [localStatus, setLocalStatus] = useState(row.original.paid)
      const handleToggle = async () => {
        setLocalStatus(!localStatus) // UI otimista
        try {
          await paySale(row.original.saleId)
        } catch (err) {
          console.error(err)
          setLocalStatus(row.original.paid) // Reverter em caso de erro
        }
      }
      return (
        <div className="flex items-center gap-3">
      

      <div className="flex items-center gap-1.5">
        {localStatus ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4 text-amber-600" />}
        <span className={`text-sm font-medium ${localStatus ? "text-emerald-800" : "text-amber-800"}`}>
          {localStatus ? "Pago" : "Pendente"}
        </span>
      </div>
      <Checkbox
        checked={localStatus}
        className={`
          h-5 w-5 transition-all duration-200 ease-in-out rounded-md
          ${
            localStatus
              ? "border-emerald-500 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              : "border-amber-400 hover:border-amber-500"
          }
          data-[state=checked]:text-white
          shadow-sm hover:shadow-md
        `}
        onCheckedChange={handleToggle}
      />
    </div>
      )
    }
  },
  {
    id: "actions",
    cell: function Cell({ row }) {

      const sale = row.original
      const { mutateAsync: deleteSale } = useDeleteSale()
      return (
        <>
        <EditSaleDialog clientName={row.original.clientName} saleId={row.original.saleId} />
          <ConfirmDeleteDialog trigger={
            <Button variant="destructive" size="sm" className=" hover:scale-105 transition-all duration-300">
              <Trash2 className="w-4 h-4" />
            </Button>

          }
            onConfirm={() => {
              deleteSale(sale.movementId)
            }}
            title="Excluir Venda"
            description="Tem certeza que deseja excluir essa venda?"
          />

        </>


      )
    }
  }

]