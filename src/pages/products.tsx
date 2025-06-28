import { ProductsTable } from "@/components/products/products-table"
import { columns } from "@/components/products/columns"
import { useProducts } from "@/hooks/products/get-products"
import { CreateProductDialog } from "@/components/products/create-product-dialog"
import { CreateCategoryDialog } from "@/components/categories/create-category-dialog"
import { CategoriesListDialog } from "@/components/categories/categories-list-dialog"
import { ProductsAccordion } from "@/components/products/products-accordion"
import { useIsMobile } from "@/hooks/use-mobile"
export default function Products() {
  const { data } = useProducts()
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4">
      <div className="pl-12 pt-6 space-y-2">
      <h1 className="text-2xl font-bold ">Produtos</h1>
      <p className="text-muted-foreground">Gerencie seus produtos</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 px-4 sm:justify-end sm:gap-3 md:gap-4">
        <CreateProductDialog />
        <CreateCategoryDialog />
        <CategoriesListDialog />
      </div>
      <div className="p-4">
        {!isMobile ? (
          <ProductsTable columns={columns} data={data} />
        ) : (
          <ProductsAccordion products={data} />
        )}
      </div>
      
    </div>
    
  )
}