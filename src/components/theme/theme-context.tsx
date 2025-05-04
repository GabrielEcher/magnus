import { createContext } from "react";
import { initialState, ThemeProviderState } from "./theme-provider";

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)