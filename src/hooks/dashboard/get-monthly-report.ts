import { api_db } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";
import { MonthlyReport } from "@/types/dashboard/monthly-report";

const fetchMonthlyData = async (): AxiosPromise<MonthlyReport> => {
    try {
        const response = await api_db.get<MonthlyReport>("/dashboard/monthly-report");
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
                toast.error('Erro inesperado ao buscar dados de venda e compra do ano', {
                    description: 'Tente fazer login novamente'
                })
            }
        }
        return Promise.reject(error);
}
}

export function useMonthlyReport() {
    const query = useQuery({
        queryFn: fetchMonthlyData,
        queryKey: ['monthly-report'],
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data?.data
    }
}