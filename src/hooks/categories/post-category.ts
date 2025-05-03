import { CreateCategory } from "@/lib/zod/categories";
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateCategoryResponse {
    message: string;
}
const createCategory = async (data: CreateCategory): Promise<CreateCategoryResponse> => {
    const response = await api_db.post<CreateCategoryResponse>("/categories", data)
    return response.data
}
export function usePostCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategory,
        onSuccess: (response, data) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success(`${response.message}`, {
                description: `A categoria ${data.name} foi criada com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}