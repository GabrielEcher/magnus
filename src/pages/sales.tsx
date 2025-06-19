import { useSales } from "@/hooks/products/sales/get-sales"
import { SalesTable } from "@/components/sales/sales-table"
import { salesColumns } from "@/components/sales/columns"
import SaleDialog from "@/components/sales/sale-dialog"

export default function Sales() {
  const { data } = useSales()

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8"> {/* Added responsive padding */}
      <div className="space-y-2"> {/* Removed fixed padding for mobile */}
        <h1 className="text-2xl font-bold">Vendas</h1>
        <p className="text-muted-foreground">Gerencie suas vendas realizadas de produtos de sua empresa</p>
      </div>

      {/* Adjusted button placement for better mobile experience */}
      <div className="flex justify-end items-center gap-2"> {/* Removed fixed padding for mobile */}
        <SaleDialog />
      </div>

      <div> {/* Removed fixed padding for mobile */}
        <SalesTable columns={salesColumns} data={data} />
      </div>
    </div>
  )
}