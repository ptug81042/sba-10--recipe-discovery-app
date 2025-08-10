export interface FavoritesContextType {
    favoriteIds: string[]
    addFavorite: (id: string) => void
    removeFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
    favoriteRecipes: string[]
}