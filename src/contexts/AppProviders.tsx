import React from "react"
import { ThemeProvider } from "./theme/ThemeProvider"
import { FavoritesProvider } from "./favorites/FavoritesProvider"

interface AppProviderProps {
    children: React.ReactNode
}

export const AppProviders: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                {children}
            </FavoritesProvider>
        </ThemeProvider>
    )
}
