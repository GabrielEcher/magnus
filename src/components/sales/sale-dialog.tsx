import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { usePostSale } from "@/hooks/products/sales/post-sale"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useSaleForm } from "@/lib/zod/sale"
import { ProductsSelect } from "../products/products-select"
import { ClientsSelect } from "../clients/clients-select"
import { useProducts } from "@/hooks/products/get-products"
import { useClients } from "@/hooks/clients/get-clients"
import { useState } from "react"


type SaleFormValues = {
  productId: string
  clientId: string
  quantity: number
}

export default function SaleDialog() {
  const [open, setOpen] = useState(false)
  const form = useSaleForm()
  const { mutateAsync: createSale, isPending } = usePostSale()
  const productId = form.watch("productId")
  const clientId = form.watch("clientId")
  const { data: products = [] } = useProducts()
  const { data: clients = [] } = useClients()

  const selectedProduct = products.find(p => p.publicId === productId)
  const selectedClient = clients.find(c => c.publicId === clientId)
  const profitMargin = selectedProduct ? ((selectedProduct.price - selectedProduct.buyPrice) / selectedProduct.buyPrice * 100) : 0
  async function onSubmit(values: SaleFormValues) {
    await createSale({
      productId: values.productId,
      quantity: values.quantity,
      clientId: values.clientId,
    })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="hover:scale-105 transition-all duration-300">
          <PlusCircle/> Adicionar Venda
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Venda</DialogTitle>
          <DialogDescription>
            Selecione produto, cliente e especifique a quantidade.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <FormControl>
                      <ProductsSelect value={field.value} onSelect={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <ClientsSelect value={field.value} onSelect={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? 1}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {selectedProduct && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Categoria</span>
                  <span className="text-sm">{selectedProduct.categoryName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Estoque Atual</span>
                  <span className="text-sm">{selectedProduct.stock}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Preço</span>
                  <span className="text-sm">R${selectedProduct.price}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Preço de Compra</span>
                  <span className="text-sm">R${selectedProduct.buyPrice}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Margem de lucro</span>
                  <span className="text-sm">{profitMargin.toFixed(2)}%</span>
                </div>
              </div>
            )}

            {selectedClient && (
              <div className="grid gap-2 mb-4 p-3 bg-muted rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Cliente:</span>
                  <span className="font-bold">{selectedClient.name}</span>
                </div>
                {selectedClient.email && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Email:</span>
                    <span>{selectedClient.email}</span>
                  </div>
                )}
              </div>
            )}

            {selectedProduct && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">
                    R${(selectedProduct.price * (Number(form.watch("quantity")) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            <DialogFooter className="mt-4">
              <Button
                type="submit"
                disabled={isPending || selectedProduct?.stock === 0}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}