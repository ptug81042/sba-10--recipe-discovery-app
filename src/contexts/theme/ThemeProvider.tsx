import { type ReactNode, useState, useEffect, useCallback} from "react"
import { ThemeContext } from "./ThemeContextObject"
import type { Theme } from "./ThemeContextTypes"

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('app-theme')
        return saved === 'dark' ? 'light' : 'dark'
    })

    useEffect(() => {
        document.body.className = ''
        document.body.classList.add(`theme-${theme}`)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}