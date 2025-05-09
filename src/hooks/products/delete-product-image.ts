import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteImageResponse {
    message: string;
}
const deleteImage = async (productId: string, imageId: string): Promise<DeleteImageResponse> => {
    const response = await api_db.delete<DeleteImageResponse>(`/products/photo/${productId}/${imageId}`)
    return response.data
}
export function useDeleteProductImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, imageId }: { productId: string, imageId: string }) => deleteImage(productId, imageId),        
        onSuccess: (response, data) => {
            queryClient.invalidateQueries({ queryKey: [`images-${data.productId}`] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}