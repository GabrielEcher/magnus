import { useSales } from "@/hooks/products/sales/get-sales"
import { SalesTable } from "@/components/sales/sales-table"
import { salesColumns } from "@/components/sales/columns"
import SaleDialog from "@/components/sales/sale-dialog"
export default function Sales() {
  const { data } = useSales()  
  return (
      <div className="flex flex-col gap-4">
            <div className="pl-12 pt-6 space-y-2">
            <h1 className="text-2xl font-bold ">Vendas</h1>
            <p className="text-muted-foreground">Gerencie suas vendas realizadas de produtos de sua empresa</p>
            </div>
            <div className="pl-12 flex justify-end items-center gap-2 pr-4">
            <SaleDialog/>
            </div>
            <div className="p-4">
            <SalesTable columns={salesColumns} data={data} />
            </div>
            
          </div>
    )
  }