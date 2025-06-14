import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteClientResponse {
    message: string;
}
const deleteClient = async (publicId: string): Promise<DeleteClientResponse> => {
    const response = await api_db.delete<DeleteClientResponse>("/clients/" + publicId)
    return response.data
}
export function useDeleteClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteClient,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}