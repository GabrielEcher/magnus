import { createContext, JSX } from "react";

export interface AuthContextValues {
    signIn: ({ username, password }: { username: string; password: string }) => Promise<void>;
    signOut: () => JSX.Element;
    signInWithToken: (token: string) => Promise<void>;
    authenticated: boolean;
    apiStatus: string | null;
}

export const AuthContext = createContext<AuthContextValues>({
    signIn: async () => {},
    signOut: () => <></>,
    signInWithToken: async () => {},
    authenticated: false,
    apiStatus: null,
});