import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Package,  DollarSign, Search, Trash2,} from "lucide-react"
import { Input } from "../ui/input"
import { useState, useMemo } from "react" // Importe useState e useMemo
import { Purchases } from "@/types/purchases/purchase"
import { useDeletePurchase } from "@/hooks/products/purchases/delete-purchase"
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog"
import { Button } from "../ui/button"


interface PurchasesAccordion {
  purchases: Purchases
}

export function PurchasesAccordion({ purchases }: PurchasesAccordion) {
    const { mutateAsync: deletePurchase } = useDeletePurchase();


  // Estados para pesquisa e filtro
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Lógica de filtragem e pesquisa
  const filteredPurchases = useMemo(() => {
    let currentSales = purchases

    // Aplica filtro por termo de busca
    if (searchTerm) {
      currentSales = currentSales.filter(
        (sale) => {
          // Garante que productName e clientName sejam strings antes de chamar toLowerCase()
          const productName = sale.productName ?? ""
          

          return (
            productName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
      )
    }

    

    return currentSales
  }, [purchases, searchTerm])

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex space-x-2 items-center justify-between mb-4">
        {/* Input de Pesquisa Geral */}
        <Search size={20}/>
        <Input
          placeholder="Pesquisar produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />

      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {filteredPurchases.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhuma venda encontrada com os critérios de busca.</p>
        ) : (
          filteredPurchases.map((purchase) => (
            <AccordionItem key={purchase.purchaseId} value={purchase.purchaseId} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {purchase.productLogo ? (
                      <img
                        src={purchase.productLogo || "/placeholder.svg"}
                        alt={purchase.productName}
                        width={32}
                        height={32}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-medium text-sm truncate max-w-32">{purchase.productName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(purchase.purchaseDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{formatCurrency(purchase.totalSpent)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 max-w-full overflow-hidden">
                <Card>
                  <CardContent className="p-4 space-y-3 max-w-full overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Quantidade</p>
                          <p className="font-medium">{purchase.quantity} unidades</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Preço Unitário</p>
                          <p className="font-medium">{formatCurrency(purchase.buyPrice)}</p>
                        </div>
                      </div>
                    </div>
        

                    <div className="text-xs text-muted-foreground">
                      <p>ID Compra: {purchase.purchaseId}</p>
                      {/* <p>ID Movimentação: {purchase.}</p> */}
                    </div>
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">Ações</h4>
                      </div>

                      {/* Primary Actions - Stack vertically on mobile */}
                    

                    {/* Delete Action - Separate row for better mobile UX */}
                    <div className="flex">
                      <ConfirmDeleteDialog
                        onConfirm={async () => {
                          await deletePurchase(purchase.movementId)
                        }}
                        title="Tem certeza que deseja excluir esta compra?"
                        description="Esta ação não poderá ser desfeita."
                        trigger={
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full hover:scale-105 transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </Button>
                        }
                      />
                    </div>
                  </div>
                    
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </div>
  )}