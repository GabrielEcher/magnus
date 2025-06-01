import { Sale } from "@/types/sales/sale";
import { ColumnDef } from "@tanstack/react-table";

export const salesColumns: ColumnDef<Sale>[] =[
  
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
    header: "Total Venda",
    cell: ({ row }) => {
      const totalSpent = row.original.totalRevenue
      return (
        <span className="font-medium">R$ {totalSpent}</span>
      )
  },
},
  {
    accessorKey: "saleDate",
    header: "Data da Venda",
    cell: ({ row }) => {
      const saleDate = row.original.saleDate
      const date = new Date(saleDate)
      return (
            <span>{date.toLocaleDateString()}</span>
      )
  },
}
]