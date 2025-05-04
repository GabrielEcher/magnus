import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteCategoryResponse {
    message: string;
}
const deleteCategory = async (id: string): Promise<DeleteCategoryResponse> => {
    const response = await api_db.delete<DeleteCategoryResponse>("/categories/" + id)
    return response.data
}
export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}