import { createContext } from "react"
import type { ThemeContextType } from './ThemeContextTypes'

// Export only the React context object here
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)