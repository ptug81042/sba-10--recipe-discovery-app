import React from "react"
import { ThemeProvider } from "./theme/ThemeProvider"
import { FavoritesProvider } from "./favorites/FavoritesProvider"
import { SearchProvider } from "./search/SearchProvider"

interface AppProviderProps {
    children: React.ReactNode
}

export const AppProviders: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </FavoritesProvider>
        </ThemeProvider>
    )
}
