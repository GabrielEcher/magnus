import { useSales } from "@/hooks/products/sales/get-sales"
import { SalesTable } from "@/components/sales/sales-table"
import { salesColumns } from "@/components/sales/columns"
import SaleDialog from "@/components/sales/sale-dialog"
import SalesAccordion from "@/components/sales/sales-accordion"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Sales() {
  const { data } = useSales();
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8"> {/* Added responsive padding */}
      <div className="space-y-2"> {/* Removed fixed padding for mobile */}
        <h1 className="text-2xl font-bold">Vendas</h1>
        <p className="text-muted-foreground">Gerencie suas vendas realizadas</p>
      </div>

      {/* Adjusted button placement for better mobile experience */}
      <div className="flex justify-end items-center gap-2"> {/* Removed fixed padding for mobile */}
        <SaleDialog />
      </div>
        {isMobile ? (
          <SalesAccordion sales={data} />
        ) : (
          <SalesTable columns={salesColumns} data={data} />
        )}
    
    </div>
  )
}