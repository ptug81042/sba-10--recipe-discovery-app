import React, { useState, useEffect, useCallback, useMemo } from "react"
import { SearchContext } from "./SearchContextObject"
import type { SearchContextType } from "./SearchContextTypes"

interface SearchProviderProps {
    children: React.ReactNode
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQueryState] = useState<string>(() => {
        return localStorage.getItem("searchQuery") || ""
    })

    useEffect(() => {
        localStorage.setItem("searchQuery", searchQuery)
    }, [searchQuery])

    const setSearchQuery = useCallback((query: string) => {
        setSearchQueryState(query)
    }, [])

    const resetSearch = useCallback(() => {
        setSearchQueryState("")
    }, [])

    const value = useMemo<SearchContextType>(() => ({
        searchQuery,
        setSearchQuery,
        resetSearch,
    }), [searchQuery, setSearchQuery, resetSearch])

    return <SearchContext.Provider value={value}>
        {children}
    </SearchContext.Provider>
}