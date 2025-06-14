
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ChangePaidStatusResponse {
    message: string;
}
const paidSale = async (saleId: string): Promise<ChangePaidStatusResponse> => {
    const response = await api_db.put<ChangePaidStatusResponse>(`/sales/${saleId}/paid`)
    return response.data
}
export function usePaidSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: paidSale,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sales'] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}