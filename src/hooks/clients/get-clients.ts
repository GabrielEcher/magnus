import { api_db } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";
import { Clients } from "@/types/clients/clients";

const fetchClients = async (): AxiosPromise<Clients> => {
    try {
        const response = await api_db.get<Clients>("/clients");
        return response;
    }
    catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
            if (error.code === 'ERR_NETWORK') {
                toast.error('Problema ao comunicar-se com o servidor', {
                    description: 'Contate o suporte'
                })
            }
            if (error.response?.status === 500) {
                toast.error('Erro inesperado ao buscar clientes', {
                    description: 'Tente fazer login novamente'
                })
            }
        }
        return Promise.reject(error);
}
}

export function useClients() {
    const query = useQuery({
        queryFn: fetchClients,
        queryKey: ['clients'],
        retry: 2,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data?.data ?? []
    }
}