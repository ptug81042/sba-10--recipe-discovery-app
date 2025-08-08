import React, { createContext, useContext, type ReactNode, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

// Type for context state and methods
interface FavoritesContextType {
    favooriteIds: string[]
    addFavorite: (id: string) => void
    removeFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
}

// Create context with default empty object cast to type
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Provider props
interface FavoritesProviderProps {
    children: ReactNode
}

// Provider component to wrap app or parts needing favorites state
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    // Use custom hook to persist favorites in localStorage under key 'favorites'
    const [ favooriteIds, setFavoriteIds ] = useLocalStorage<string[]>('favorites', [])

    // Add favorite recipe ID, avoid duplicates
    const addFavorite = useCallback(
        (id: string) => {
            setFavoriteIds((prev) => {
                if (!prev.includes(id)) {
                    return [...prev, id]
                }
                return prev
            })
        },
        [setFavoriteIds]
    )

    // Remove favorite recipe ID
    const removeFavorite = useCallback(
        (id: string) => {
            setFavoriteIds((prev) => prev.filter((favId) => favId !== id))
        },
        [setFavoriteIds]
    )

    // Check if an ID is already favorited
    const isFavorite = useCallback(
        (id: string) => favooriteIds.includes(id),
        [favooriteIds]
    )

    return (
        <FavoritesContext.Provider value={{ favooriteIds, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

// Hook to consume favorites context easily in components
export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}