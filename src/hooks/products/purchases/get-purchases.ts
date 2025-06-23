import { api_db } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";
import { Purchases } from "@/types/purchases/purchase";

const fetchPurchases = async (): AxiosPromise<Purchases> => {
    try {
        const response = await api_db.get<Purchases>("/purchases");
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
                toast.error('Erro inesperado ao buscar compras realizadas', {
                    description: 'Tente fazer login novamente'
                })
            }
            if (error.response?.status === 401) {
                localStorage.clear();
                window.location.href = '/';
                setTimeout(() => {
                    toast.error('Sessão expirada', {
                        description: 'Faça login novamente'
                    })
                }, 1000)
            }
        }
        return Promise.reject(error);
}
}

export function usePurchases() {
    const query = useQuery({
        queryFn: fetchPurchases,
        queryKey: ['purchases'],
        retry: 2,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data?.data ?? []
    }
}