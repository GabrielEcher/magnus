import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteProductResponse {
    message: string;
}
const deleteProduct = async (publicId: string): Promise<DeleteProductResponse> => {
    const response = await api_db.delete<DeleteProductResponse>("/products/" + publicId)
    return response.data
}
export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success(`${response.message}`, {
                description: `O produto foi excluído com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}