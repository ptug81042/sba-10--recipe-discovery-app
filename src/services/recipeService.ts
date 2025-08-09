// src/services/recipeService.ts

import type { RecipeSummary, RecipeDetailResponse } from '../types/recipe';

// Base API URL for TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Fetch all recipe categories.
 * Endpoint: /categories.php
 * Returns a Promise resolving to an array of category objects.
 */
export const fetchCategories = async (): Promise<{categories: {idCategory: string, strCategory: string, strCategoryThumb: string, strCategoryDescription: string}[]}> => {
  const response = await fetch(`${BASE_URL}/categories.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

/**
 * Fetch recipes by category name.
 * Endpoint: /filter.php?c={categoryName}
 * @param categoryName The category name to filter recipes by.
 * Returns a Promise resolving to an array of RecipeSummary objects.
 */
export const fetchRecipesByCategory = async (categoryName: string): Promise<{meals: RecipeSummary[] | null}> => {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes for category: ${categoryName}`);
  }
  return response.json();
};

/**
 * Fetch detailed recipe info by recipe ID.
 * Endpoint: /lookup.php?i={recipeId}
 * @param recipeId The ID of the recipe to fetch details for.
 * Returns a Promise resolving to RecipeDetailResponse.
 */
export const fetchRecipeDetailsById = async (recipeId: string): Promise<RecipeDetailResponse> => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(recipeId)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe details for ID: ${recipeId}`);
  }
  return response.json();
};

/**
 * Search recipes by name.
 * Endpoint: /search.php?s={query}
 * @param query The search query string.
 * Returns a Promise resolving to an object with meals array or null.
 */
export const searchRecipesByName = async (query: string): Promise<{meals: RecipeSummary[] | null}> => {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Failed to search recipes with query: ${query}`);
  }
  return response.json();
};