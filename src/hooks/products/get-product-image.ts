import { ProductImages } from "@/types/products/products";
import { api_db } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosPromise } from "axios";
import { toast } from "sonner";

const fetchImages = async (productId: string): AxiosPromise<ProductImages> => {
    try {
        const response = await api_db.get<ProductImages>(`/products/photo/${productId}`)
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
        }
        return Promise.reject(error);
}
}

export function useProductImages(productId: string) {
    const query = useQuery({
        queryFn: () => fetchImages(productId),
        queryKey: [`images-${productId}`],
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus: false
    })
    return {
        ...query,
        data: query.data
    }
}