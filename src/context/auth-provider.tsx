import { useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { api_auth } from "@/services/api/api";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, AuthContextValues } from "./auth-context-";
import { toast } from "sonner";


type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [apiStatus, setApiStatus] = useState<string | null>(null);
    const [user, setUser] = useState<boolean>(false);

    useEffect(() => {
        const loadingStoreData = () => {
          const token = localStorage.getItem('magnusToken');
          const expireTimeString = localStorage.getItem('magnusTokenExpireTime');
      
          if (expireTimeString) {
            const expireTime = new Date(expireTimeString);
            const currentTime = new Date();
      
            if (currentTime > expireTime) {
              localStorage.clear();
              window.location.href = "/";
            } else if (token) { 
              setUser(true); 
            }
          }
        };
      
        loadingStoreData();
      }, [apiStatus]);

    const signIn = async ({ username, password }: { username: string; password: string }) => {
        try {
            const result = await api_auth.post("/token", { username, password }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            localStorage.setItem('magnusToken', `${result.data.access_token}`);
            
            const expireTime = new Date();
            expireTime.setDate(expireTime.getDate() + 1);
            localStorage.setItem('magnusTokenExpireTime', expireTime.toString());
            
            setApiStatus(null);
            setUser(true);

        } catch (err: unknown) {
            if (err instanceof Error && axios.isAxiosError(err)) {
                setApiStatus(err.response?.data.detail || "Erro desconhecido");
                toast.error(err.response?.data.detail || "Erro desconhecido");
            } else {
                console.error("Erro desconhecido durante o login:", err);
            }
        }
    };

    const signInWithToken = async (token: string) => {
        localStorage.setItem('magnusToken', token);
        // Opcional: salvar tempo de expiração, etc.
        const expireTime = new Date();
        expireTime.setDate(expireTime.getDate() + 1);
        localStorage.setItem('magnusTokenExpireTime', expireTime.toString());
        // Atualiza o estado
        setUser(true);
      
        // Se necessário, buscar dados do usuário aqui
        
      };

    const signOut = () => {
        localStorage.clear();
        setUser(false);
        window.location.reload();
        return <Navigate to="/" replace />;
    };

    const value: AuthContextValues = {
        signIn,
        signOut,
        signInWithToken,
        authenticated: !!user,
        apiStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};