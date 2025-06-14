import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteSaleResponse {
    message: string;
}
const deleteSale = async (movementId: string): Promise<DeleteSaleResponse> => {
    const response = await api_db.delete<DeleteSaleResponse>("/stockMovements/" + movementId)
    return response.data
}
export function useDeleteSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSale,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['sales'] })
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success(`${response.message}`, {
                description: `Movimentação de venda excluída com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}