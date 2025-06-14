import { ClientFormValues } from "@/lib/zod/clients";
import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditClientResponse {
    message: string;
}

interface EditClientData {
    id: string;
    data: ClientFormValues;
}
const editClient = async ({ id, data }: EditClientData): Promise<EditClientResponse> => {
    const { id: _ignored, ...cleanData }: { id?: string } & Omit<ClientFormValues, "id"> = data;
    console.log(_ignored)
    const response = await api_db.put<EditClientResponse>(`/clients/${id}`, cleanData);
    return response.data;
};

export function useEditClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editClient,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            toast.success(`${response.message}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}