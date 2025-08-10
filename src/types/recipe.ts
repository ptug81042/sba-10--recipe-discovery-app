// src/types/recipe.ts

// Type for a recipe in lists (search results, category pages, etc.)
export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Type for full recipe details
export interface RecipeDetails {
  ingredients: { ingredient: string; measure: string }[];
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

// API response type for recipe details
export interface RecipeDetailResponse {
  meals: RecipeDetails[];
}

// API response type for recipe lists
export interface RecipeListResponse {
  meals: RecipeSummary[];
}