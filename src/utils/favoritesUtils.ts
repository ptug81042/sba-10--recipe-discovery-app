// Key used for localStorage to persist favorites
export const FAVORITES_STORAGE_KEY = 'favorites';

// Helper function to check if an ID is in the favorites list
export function isIdInFavorites(id: string, favorites: string[]): boolean {
  return favorites.includes(id);
}