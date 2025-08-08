import { createContext } from 'react'
import type { FavoritesContextType } from './FavoritesContextTypes'

// Export only the context object here (no provider or hook)
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)
