import { usePurchases } from "@/hooks/products/purchases/get-purchases"
import { purchasesColumns } from "@/components/purchases/columns"
import { PurchasesTable } from "@/components/purchases/purchases-table"
import PurchaseDialog from "@/components/purchases/purchase-dialog"
export default function Purchases() {
  const { data} = usePurchases()  
  return (
      <div className="flex flex-col gap-4">
            <div className="pl-12 pt-6 space-y-2">
            <h1 className="text-2xl font-bold ">Compras</h1>
            <p className="text-muted-foreground">Gerencie suas compras realizadas de produtos de sua empresa</p>
            </div>
            <div className="pl-12 flex justify-end items-center gap-2 pr-4">
            <PurchaseDialog/>
            </div>
            <div className="p-4">
            <PurchasesTable columns={purchasesColumns} data={data} />
            </div>
            
          </div>
    )
  }