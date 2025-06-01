
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateSaleResponse {
    message: string;
}
const createSale = async (productId: string, quantity: number): Promise<CreateSaleResponse> => {
    
    const response = await api_db.post<CreateSaleResponse>(`/products/sell/${productId}?quantity=${quantity}`)
    return response.data
}
export function usePostSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { productId: string, quantity: number }) => createSale(data.productId, data.quantity),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['sales'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}