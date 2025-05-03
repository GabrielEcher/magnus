import { Product } from "@/types/products/products"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"
import { Tag, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog"
import { useDeleteProduct } from "@/hooks/products/delete-product"
import { EditProductDialog } from "./edit-product-dialog"

const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
]

function getColorForCategory(category: string): string {
    if (!category) return "bg-gray-400"

    const normalized = category.trim().toLowerCase()

    // Simples hash somando o código de cada caractere
    const hash = Array.from(normalized).reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const index = hash % bgColors.length
    return bgColors[index]
}
export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Produto",
    },
    {
        accessorKey: "categoryName",
        id: "category",
        header: () => <div className="flex items-center gap-2"><Tag size={14} />Categoria</div>,
        cell: ({ row }) => {
            const category = row.original.categoryName

            if (!category) {
                return (
                    <div className="flex items-center gap-2">
                        <Badge className="bg-gray-400 text-white">Sem categoria</Badge>
                    </div>
                )
            }

            const bgClass = getColorForCategory(category)

            return (
                <div className="flex items-center gap-2">
                    <Badge className={`${bgClass} text-white`}>{category}</Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "price",
        header: "Preço",
    },
    {
        accessorKey: "buyPrice",
        header: "Preço de compra",
    },
    {
        accessorKey: "stock",
        header: "Estoque",
    },
    {
        accessorKey: "actions",
        header: "Ações",
        cell: function Cell({ row }) {
            const product = row.original

            const { mutateAsync: deleteProduct } = useDeleteProduct()
            return (
                <div className="flex items-center gap-2">
                    <EditProductDialog product={product} />

                    <ConfirmDeleteDialog
                        trigger={
                            <Button variant="ghost" className="hover:scale-110 transistion-all duration-300 text-red-500">
                                <Trash2 size={16} />
                            </Button>
                        }
                        onConfirm={async () => {
                            await deleteProduct(product.publicId)
                        }}
                        title={`Excluir produto "${product.name}"?`}
                        description="Essa ação é irreversível e removerá o produto do sistema."
                    />
                </div>
            )
        }
    }
]