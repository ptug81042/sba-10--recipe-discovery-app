// src/contexts/ThemeProvider.tsx
import { type ReactNode, useState, useEffect, useCallback } from 'react'
import { ThemeContext } from './ThemeContextObject'
import type { Theme } from './ThemeContextTypes'

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // Initialize theme state from localStorage or default to 'light'
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('app-theme')
        return savedTheme === 'dark' ? 'dark' : 'light'
    })

    // Sync theme class to document body and localStorage whenever theme changes
    useEffect(() => {
        document.body.className = ''
        document.body.classList.add(`theme-${theme}`)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    // Toggle between 'light' and 'dark' themes
    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }, [])

    // Provide theme state and toggle function to descendants
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}