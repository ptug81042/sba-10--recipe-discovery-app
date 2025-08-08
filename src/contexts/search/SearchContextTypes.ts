export interface SearchContextType {
    searchQuery: string
    setSearchQuery: (query: string) => void
    resetSearch: () => void
}