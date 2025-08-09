import { useContext } from "react"
import { ThemeContext } from "../contexts/theme/ThemeContextObject"
import type { ThemeContextType } from "../contexts/theme/ThemeContextTypes"

/**
 * Custom hook to consume the ThemeContext safely.
 * Throws an error if used outside the ThemeProvider.
 * 
 * @returns The current theme context value.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}