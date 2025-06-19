import { EditSaleFormValues } from "@/lib/zod/sale";
import { api_db } from "@/services/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditSaleResponse {
    message: string;
}

const editSale = async (saleId: string, data: EditSaleFormValues): Promise<EditSaleResponse> => {
    const response = await api_db.put<EditSaleResponse>(`/sales/` + saleId, data)
    return response.data
}

export function useEditSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ saleId, data }: { saleId: string; data: EditSaleFormValues }) => editSale(saleId, data),        
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['sales'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

