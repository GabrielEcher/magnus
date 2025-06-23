import { Products } from "@/types/products/products";
import { api_db } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";

const fetchProducts = async (): AxiosPromise<Products> => {
    try {
        const response = await api_db.get<Products>("/products")
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
                toast.error('Erro inesperado ao buscar produtos', {
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

export function useProducts() {
    const query = useQuery({
        queryFn: fetchProducts,
        queryKey: ['products'],
        retry: 2,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data?.data ?? []
    }
}