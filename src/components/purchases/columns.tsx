import { Purchase } from "@/types/purchases/purchase";
import { ColumnDef } from "@tanstack/react-table";

export const purchasesColumns: ColumnDef<Purchase>[] =[
  
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
    accessorKey: "buyPrice",
    header: "Preço de Compra",
    cell: ({ row }) => {
      const buyPrice = row.original.buyPrice
      return (
        <span className="font-medium">R$ {buyPrice}</span>
      )
  },
  },
  {
    accessorKey: "totalSpent",
    header: "Total Gasto",
    cell: ({ row }) => {
      const totalSpent = row.original.totalSpent
      return (
        <span className="font-medium">R$ {totalSpent}</span>
      )
  },
},
  {
    accessorKey: "purchaseDate",
    header: "Data da Compra",
    cell: ({ row }) => {
      const purchaseDate = row.original.purchaseDate
      const date = new Date(purchaseDate)
      return (
            <span>{date.toLocaleDateString()}</span>
      )
  },
}
]