import { api_db } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";
import { FinancialSummary } from "@/types/dashboard/financial-summary";

const fetchFinancialSummary = async (): AxiosPromise<FinancialSummary> => {
    try {
        const response = await api_db.get<FinancialSummary>("/dashboard/financial-summary");
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
                toast.error('Erro inesperado ao buscar sumário financeiro', {
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

export function useFinancialSummary() {
    const query = useQuery({
        queryFn: fetchFinancialSummary,
        queryKey: ['financial-summary'],
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data?.data
    }
}