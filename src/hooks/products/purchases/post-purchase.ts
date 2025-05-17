
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreatePurchaseResponse {
    message: string;
}
const createPurchase = async (productId: string, quantity: number): Promise<CreatePurchaseResponse> => {
    
    const response = await api_db.post<CreatePurchaseResponse>(`/products/buy/${productId}?quantity=${quantity}`)
    return response.data
}
export function usePostPurchase() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { productId: string, quantity: number }) => createPurchase(data.productId, data.quantity),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['purchases'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}