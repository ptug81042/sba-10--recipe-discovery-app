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
 * Fetches all meals from TheMealDB API.
 * Note: The API doesn't have a true "get all meals" endpoint,
 * so this uses search.php?s= to get all recipes (empty string returns all).
 */
export async function getAllRecipes() {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=`);
    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${response.status}`);
    }

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error in getAllRecipes:', error);
    return [];
  }
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
  const data = await fetchJSON<RecipeDetailResponse>(url);
  return data.meals ? data.meals[0] : null;
}