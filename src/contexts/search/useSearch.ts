import { useContext } from 'react'
import { SearchContext } from './SearchContextObject'
import type { SearchContextType } from './SearchContextTypes'

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider")
    }
    return context
}