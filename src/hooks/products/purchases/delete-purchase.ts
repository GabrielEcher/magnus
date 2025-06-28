import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeletePurchaseResponse {
    message: string;
}
const deletePurchase = async (movementId: string): Promise<DeletePurchaseResponse> => {
    const response = await api_db.delete<DeletePurchaseResponse>("/stockMovements/" + movementId)
    return response.data
}
export function useDeletePurchase() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePurchase,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['purchases'] })
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success(`${response.message}`, {
                description: `Movimentação de compra excluída com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}