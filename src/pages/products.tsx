import { ProductsTable } from "@/components/products/products-table"
import { columns } from "@/components/products/columns"
import { useProducts } from "@/hooks/products/get-products"
import { CreateProductDialog } from "@/components/products/create-product-dialog"
import { CreateCategoryDialog } from "@/components/categories/create-category-dialog"
export default function Products() {
  const { data } = useProducts()
  return (
    <div className="flex flex-col gap-4">
      <div className="pl-12 pt-6 space-y-2">
      <h1 className="text-2xl font-bold ">Produtos</h1>
      <p className="text-muted-foreground">Gerencie seus produtos</p>
      </div>
      <div className="pl-12 flex justify-end items-center gap-2 pr-4">
      <CreateProductDialog />
      <CreateCategoryDialog />
      </div>
      <div className="p-4">
      <ProductsTable columns={columns} data={data} />
      </div>
      
    </div>
    
  )
}