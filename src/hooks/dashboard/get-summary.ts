import { api_db } from "@/services/api/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";
import { Summary } from "@/types/dashboard/summary";

const fetchSummary = async (): AxiosPromise<Summary> => {
    try {
        const response = await api_db.get<Summary>("/dashboard/summary");
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
                toast.error('Erro inesperado ao buscar sumário do dashboard', {
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

export function useSummary() {
    const query = useSuspenseQuery({
        queryFn: fetchSummary,
        queryKey: ['summary'],
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data?.data
    }
}