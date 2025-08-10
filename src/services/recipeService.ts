// src/services/recipeService.ts

import type { RecipeSummary, RecipeDetailResponse, RecipeDetails } from "../types/recipe";

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
export async function getRecipeDetailsById(id: string): Promise<RecipeDetails | null> {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: RecipeDetailResponse = await res.json();
    if (!data.meals || data.meals.length === 0) return null;

    const meal = data.meals[0];

    // Build ingredients array from strIngredientX and strMeasureX
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientRaw = meal[`strIngredient${i}` as keyof typeof meal];
      const measureRaw = meal[`strMeasure${i}` as keyof typeof meal];

      // Only proceed if ingredientRaw is a non-empty string
      if (typeof ingredientRaw === "string" && ingredientRaw.trim() !== "") {
        const ingredient = ingredientRaw.trim();

        // For measure, if it's a string, trim it; else empty string
        const measure = typeof measureRaw === "string" ? measureRaw.trim() : "";

        ingredients.push({ ingredient, measure });
      }
    }

    return {
      ...meal,
      ingredients,
    };
  } catch (error) {
    console.error("Failed to fetch recipe details:", error);
    return null;
  }
}