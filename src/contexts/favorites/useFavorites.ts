// src/contexts/useFavorites.ts
import { useContext } from 'react'
import { FavoritesContext } from './FavoritesContextObject'
import type { FavoritesContextType } from './FavoritesContextTypes'

// Custom hook to consume favorites context safely
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}