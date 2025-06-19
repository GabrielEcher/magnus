import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useProducts } from "@/hooks/products/get-products"

interface ProductsSelectProps {
  value?: string
  onSelect: (value: string) => void
}

export function ProductsSelect({ value, onSelect }: ProductsSelectProps) {
  const [open, setOpen] = useState(false)
  const { data: products = [], isLoading } = useProducts()

  const selected = products.find(p => p.publicId === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Carregando...
            </span>
          ) : selected ? (
            selected.name
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
              {products.map(product => (
                <CommandItem
                  key={product.publicId}
                  value={product.name}
                  onSelect={() => {
                    onSelect(product.publicId)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.publicId === product.publicId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      R${product.price} | Estoque: {product.stock}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}