import { CreateCategory } from "@/lib/zod/categories";
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateCompanyResponse {
    message: string;
}
const updateCategory = async (id: string, data: CreateCategory): Promise<UpdateCompanyResponse> => {
    const response = await api_db.put<UpdateCompanyResponse>("/categories/" + id, data)
    return response.data
}
export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateCategory }) => updateCategory(id, data),
        onSuccess: (response, data) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success(`${response.message}`, {
                description: `A categoria ${data.data.name} foi editada com sucesso!`
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}