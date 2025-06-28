import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sales } from "@/types/sales/sale"
import { Package, User, DollarSign, CheckCircle, XCircle, Edit, Trash2, Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState, useMemo } from "react" // Importe useState e useMemo

import { usePaidSale } from "@/hooks/products/sales/change-sale-paid-status"
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog"
import { useDeleteSale } from "@/hooks/products/sales/delete-sale"
import { EditSaleDialog } from "./edit-sale-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select" // Importe Select components


interface SalesAccordionProps {
  sales: Sales
}

export default function SalesAccordion({ sales }: SalesAccordionProps) {
  const { mutateAsync: markAsPaid, isPending } = usePaidSale()
  const { mutateAsync: deleteSale } = useDeleteSale()

  // Estados para pesquisa e filtro
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending">("all")

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
  const filteredSales = useMemo(() => {
    let currentSales = sales

    // Aplica filtro por termo de busca
    if (searchTerm) {
      currentSales = currentSales.filter(
        (sale) => {
          // Garante que productName e clientName sejam strings antes de chamar toLowerCase()
          const productName = sale.productName ?? ""
          const clientName = sale.clientName ?? ""

          return (
            productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clientName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
      )
    }

    // Aplica filtro por status de pagamento
    if (paymentFilter !== "all") {
      currentSales = currentSales.filter((sale) => {
        if (paymentFilter === "paid") {
          return sale.paid === true
        } else if (paymentFilter === "pending") {
          return sale.paid === false
        }
        return true
      })
    }

    return currentSales
  }, [sales, searchTerm, paymentFilter])

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex space-x-2 items-center justify-between mb-4">
        {/* Input de Pesquisa Geral */}
        <Input
          placeholder="Pesquisar produto ou cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />


        {/* Dropdown de Filtro por Status de Pagamento */}
        <Select value={paymentFilter} onValueChange={(value: "all" | "paid" | "pending") => setPaymentFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="paid">Pagos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {filteredSales.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhuma venda encontrada com os critérios de busca.</p>
        ) : (
          filteredSales.map((sale) => (
            <AccordionItem key={sale.saleId} value={sale.saleId} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {sale.productLogo ? (
                      <img
                        src={sale.productLogo || "/placeholder.svg"}
                        alt={sale.productName}
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
                      <p className="font-medium text-sm truncate max-w-32">{sale.productName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(sale.saleDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${sale.paid ? "bg-emerald-600 text-white" : "bg-orange-700 text-white"}`}>
                      {sale.paid ? "Pago" : "Pendente"}
                    </Badge>
                    <span className="font-semibold text-sm">{formatCurrency(sale.totalRevenue)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 max-w-full overflow-hidden">
                <Card>
                  <CardContent className="p-4 space-y-3 max-w-full overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Cliente</p>
                          <p className="font-medium">{sale.clientName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Quantidade</p>
                          <p className="font-medium">{sale.quantity} unidades</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Preço Unitário</p>
                          <p className="font-medium">{formatCurrency(sale.sellPrice)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        {sale.paid ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium">Status Pagamento: <Badge className={`${sale.paid ? "bg-emerald-600" : "bg-red-700"} text-white`}>
                          {sale.paid ? "Pago" : "Pendente"}
                        </Badge></span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>ID Venda: {sale.saleId}</p>
                      <p>ID Movimentação: {sale.movementId}</p>
                    </div>
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">Ações</h4>
                      </div>

                      {/* Primary Actions - Stack vertically on mobile */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <EditSaleDialog
                        trigger={
                          <Button size="sm" variant="outline" className="w-full sm:flex-1" onClick={() => {}}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        }
                        clientName={sale.clientName}
                        saleId={sale.saleId}
                      />

                      <Button
                        disabled={isPending}
                        size="sm"
                        className={`w-full sm:flex-1 ${sale.paid ? "" : "bg-emerald-700 text-white hover:bg-emerald-600"}`}
                        variant={sale.paid ? "outline" : "default"}
                        onClick={async () => {
                          
                          await markAsPaid(sale.saleId)
                          
                        }}
                      >
                        {isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : sale.paid ? (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}

                        {sale.paid ? "Não Pago" : "Marcar como Pago"}
                      </Button>
                    </div>

                    {/* Delete Action - Separate row for better mobile UX */}
                    <div className="flex">
                      <ConfirmDeleteDialog
                        onConfirm={async () => {
                          await deleteSale(sale.movementId)
                        }}
                        title="Tem certeza que deseja excluir esta venda?"
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