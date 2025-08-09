// src/services/recipeService.ts

import type { RecipeSummary, RecipeDetailResponse } from "../types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Search recipes by name (query)
 * @param query - search string
 * @returns array of RecipeSummary or empty array if none found
 */
export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  if (!query) return [];
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
  const data = await fetchJSON<{ meals: RecipeSummary[] | null }>(url);
  return data.meals ?? [];
}

/**
 * Get recipes by category filter
 * @param category - category string
 * @returns array of RecipeSummary or empty array if none found
 */
export async function getRecipesByCategory(category: string): Promise<RecipeSummary[]> {
  if (!category) return [];
  const url = `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
  const data = await fetchJSON<{ meals: RecipeSummary[] | null }>(url);
  return data.meals ?? [];
}

/**
 * Get recipe details by ID
 * @param id - recipe id string
 * @returns RecipeDetailResponse object or null if not found
 */
export async function getRecipeDetailsById(id: string) {
  if (!id) return null;
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  return fetchJSON<RecipeDetailResponse>(url);
}