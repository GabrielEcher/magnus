"use client"

import type React from "react"

import { useState } from "react"

import type { Product } from "@/types/products/products"
import { Check, ChevronsUpDown, Loader2, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useProducts } from "@/hooks/products/get-products"
import { usePostPurchase } from "@/hooks/products/purchases/post-purchase"

export function PurchaseDialog() {
  const [open, setOpen] = useState(false)
  const [comboboxOpen, setComboboxOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)

  const { data: products, isLoading: isLoadingProducts } = useProducts()
  const { mutate: createPurchase, isPending } = usePostPurchase()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProduct) return

    createPurchase(
      {
        productId: selectedProduct.publicId,
        quantity,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setSelectedProduct(null)
          setQuantity(1)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:scale-105 transition-all duration-300" variant="default"><PlusCircle/>Adicionar Compra</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar uma Compra</DialogTitle>
          <DialogDescription>Selecione um produto e especifique a quantidade do mesmo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product">Product</Label>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="justify-between"
                    disabled={isLoadingProducts}
                  >
                    {isLoadingProducts ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Carregando produtos...
                      </span>
                    ) : selectedProduct ? (
                      selectedProduct.name
                    ) : (
                      "Selecione o produto..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Pesquise o produto..." />
                    <CommandList>
                      <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {products.map((product) => (
                          <CommandItem
                            key={product.publicId}
                            value={product.name}
                            onSelect={() => {
                              setSelectedProduct(product)
                              setComboboxOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProduct?.publicId === product.publicId ? "opacity-100" : "opacity-0",
                              )}
                            />
                            <div className="flex flex-col">
                              <span>{product.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Preço: ${product.price} | Estoque: {product.stock}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {selectedProduct && (
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value)|| 0)}
                disabled={!selectedProduct}
              />
            </div>

            {selectedProduct && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">${(selectedProduct.buyPrice * quantity).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedProduct || isPending || quantity < 1}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Salvando a compra..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
