import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Package,  DollarSign, Search, Trash2, Image, Edit,} from "lucide-react"
import { Input } from "../ui/input"
import { useState, useMemo } from "react"
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog"
import { Button } from "../ui/button"
import { Products } from "@/types/products/products"
import { useDeleteProduct } from "@/hooks/products/delete-product"
import { EditProductDialog } from "./edit-product-dialog"
import { NavLink } from "react-router-dom"


interface ProductsAccordion {
  products: Products
}

export function ProductsAccordion({ products }: ProductsAccordion) {
    const { mutateAsync: deleteProduct } = useDeleteProduct();


  // Estados para pesquisa e filtro
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }


  // Lógica de filtragem e pesquisa
  const filteredProducts = useMemo(() => {
    let currentProducts = products

    // Aplica filtro por termo de busca
    if (searchTerm) {
      currentProducts = currentProducts.filter(
        (product) => {
          // Garante que productName e clientName sejam strings antes de chamar toLowerCase()
          const productName = product.name ?? ""
          

          return (
            productName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
      )
    }

    

    return currentProducts
  }, [products, searchTerm])

  return (
    <div className="w-full sm:max-w-4xl mx-auto p-4">
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
        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhuma produto encontrado com os critérios de busca.</p>
        ) : (
          filteredProducts.map((product) => (
            <AccordionItem key={product.publicId} value={product.publicId} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
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
                      <p className="font-medium text-sm truncate max-w-32">{product.name}</p>
                      {/* <p className="text-xs text-muted-foreground">{formatDate(products.purchaseDate)}</p> */}
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{formatCurrency(products.totalSpent)}</span>
                  </div> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 max-w-full overflow-hidden">
                <Card>
                  <CardContent className="p-4 space-y-3 max-w-full overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Estoque Atual</p>
                          <p className="font-medium">{product.stock} unidades</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Preço Unitário</p>
                          <p className="font-medium">{formatCurrency(product.buyPrice)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Preço Venda</p>
                          <p className="font-medium">{formatCurrency(product.price)}</p>
                        </div>
                      </div>
                    </div>
        

                    <div className="text-xs text-muted-foreground">
                      <p>ID Produto: {product.publicId}</p>
                      {/* <p>ID Movimentação: {purchase.}</p> */}
                    </div>
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">Ações</h4>
                      </div>

                      {/* Primary Actions - Stack vertically on mobile */}
                      
                    <EditProductDialog product={product} 
                    trigger={
                      <Button variant={"outline"} className="w-full sm:flex-1 mb-1">
                        <Edit/>
                        Editar Produto
                      </Button>
                    }
                    />
                    <NavLink to={`/app/products/gallery?id=${product.publicId}&name=${encodeURIComponent(product.name)}`}>
                        <Button className="w-full sm:flex-1 mb-1" variant={"outline"}>
                            <Image/>Galeria
                        </Button>
                    </NavLink>
                       
                        
                    {/* Delete Action - Separate row for better mobile UX */}
                    <div className="flex">
                      <ConfirmDeleteDialog
                        onConfirm={async () => {
                          await deleteProduct(product.publicId)
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