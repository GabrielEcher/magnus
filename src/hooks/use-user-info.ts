import { api_db } from "@/services/api/api";

import { AxiosError, AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface UserData {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    companyName: string;
    companyLogo: string | null;
    cnpj: string;
    companyId: string;
}

const fetchUserData = async (): AxiosPromise<UserData> => {
    try {
        const response = await api_db.get<UserData>("/users/info")
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
                toast.error('Erro inesperado ao buscar foto do usuário', {
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

export function useUserData() {

    const query = useQuery({
        queryFn: fetchUserData,
        queryKey: ['user-data'],
        refetchOnWindowFocus: false,
        retry: 3,
        refetchOnMount: false,
    })

    return {
        ...query,
        data: query.data?.data
    }
}