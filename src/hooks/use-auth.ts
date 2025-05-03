import { AuthContext } from "@/context/auth-context-";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}