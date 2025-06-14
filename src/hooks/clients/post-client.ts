import { ClientFormValues } from "@/lib/zod/clients";
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateClientResponse {
    message: string;
}


const createClient = async (data: ClientFormValues): Promise<CreateClientResponse> => {
    const response = await api_db.post<CreateClientResponse>("/clients", data)
    return response.data
}
export function usePostClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createClient,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}