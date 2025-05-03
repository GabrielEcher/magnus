import { CreateProduct } from "@/lib/zod/products"
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateProductResponse {
    message: string;
}
const createProduct = async (data: CreateProduct): Promise<CreateProductResponse> => {
    const productData = {
        ...data,
        price: Number(data.price),
        buyPrice: Number(data.buyPrice)
    }
    
    const response = await api_db.post<CreateProductResponse>("/products", productData)
    return response.data
}
export function usePostProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: (response, data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success(`${response.message}`, {
                description: `O produto ${data.name} foi criado com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}