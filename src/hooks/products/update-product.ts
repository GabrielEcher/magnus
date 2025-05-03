import { EditProduct } from "@/lib/zod/products"
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProductResponse {
    message: string;
}
const editProduct = async (id: string, data: EditProduct): Promise<UpdateProductResponse> => {
    const productData = {
        ...data,
        price: Number(data.price),
        buyPrice: Number(data.buyPrice)
    }
    
    const response = await api_db.put<UpdateProductResponse>("/products/" + id, productData)
    return response.data
}
export function useEditProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: EditProduct }) => editProduct(id, data),
        onSuccess: (response, data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success(`${response.message}`, {
                description: `O produto ${data.data.name} foi editado com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}