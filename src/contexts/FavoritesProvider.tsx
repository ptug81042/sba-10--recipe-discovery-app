// src/contexts/FavoritesProvider.tsx
import { type ReactNode, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { FavoritesContext } from './FavoritesContextObject'
import { FAVORITES_STORAGE_KEY, isIdInFavorites } from '../utils/favoritesUtils'

interface FavoritesProviderProps {
  children: ReactNode
}

// FavoritesProvider component manages the favorites state and provides context value
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>(FAVORITES_STORAGE_KEY, [])

  const addFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((prev) => {
        if (!isIdInFavorites(id, prev)) {
          return [...prev, id]
        }
        return prev
      })
    },
    [setFavoriteIds]
  )

  const removeFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((prev) => prev.filter((favId) => favId !== id))
    },
    [setFavoriteIds]
  )

  const isFavorite = useCallback(
    (id: string) => isIdInFavorites(id, favoriteIds),
    [favoriteIds]
  )

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}