# Recipe Discovery App — React + TypeScript + Vite + Context API

---

## Project Overview

This is a Recipe Discovery application built with **React**, **TypeScript**, and **Vite**. It uses the **Context API** for global state management including managing user favorites, search queries, and theme switching. The app supports:

- Browsing recipes by category
- Searching for recipes by name
- Viewing detailed recipe information with ingredients and instructions
- Adding/removing recipes to/from a favorites list with persistence
- Light and dark theme toggling with persistence
- Graceful loading and error state handling during data fetching

The application fetches data from the free, public [TheMealDB API](https://www.themealdb.com/api.php) with endpoints to list categories, filter by category, search by name, and lookup full recipe details.

---

## Setup (High Level)

1. **Ensure Node.js and npm/yarn are installed**  
2. **Clone the repository and navigate to the project folder**  
3. **Install dependencies with `npm install` or `yarn`**  
4. **Run the development server with `npm run dev` or `yarn dev`**  
5. **Open the app in your browser at `http://localhost:3000`**

---

## Usage Guide

- **Browse Categories:** The home page displays recipe categories. Click any category to see recipes in that category.  
- **Search Recipes:** Use the search bar in the navbar to find recipes by name. Search results display matching recipes.  
- **View Recipe Details:** Click a recipe to view its details, including ingredients, instructions, and media links.  
- **Manage Favorites:** On recipe details and home page, use the "Add to Favorites" or "Remove from Favorites" button to manage your favorite recipes. Favorites persist across sessions.  
- **Theme Toggle:** Switch between light and dark themes using the toggle button with sun/moon icons. Your preference is saved for future visits.

---

## Reflection

- **Most challenging part:**  
  The most challenging aspect of this project was designing and implementing the `FavoritesContext` with persistent state using `localStorage`. Ensuring favorites were synchronized across components and persisted properly required careful management with React hooks such as `useMemo` and `useCallback` to optimize rendering.  
  Handling TheMealDB API’s nested response structures and inconsistent data formats also required refining TypeScript types and parsing logic, especially for recipe details and ingredient extraction.

- **Design decisions:**  
  Created a reusable custom hook `useFetch` to centralize fetching logic, error handling, and loading states across components.  
  Used React Context API combined with hooks for global state management (favorites, theme, search).  
  Included a `ThemeToggleButton` component using `react-icons` for a polished toggle UI.  
  Ensured favorite recipes are displayed consistently on both the home and favorites pages by passing full recipe data objects to `RecipeCard` components, avoiding type conflicts.

---

## TheMealDB API Endpoints Used

- List all categories: `https://www.themealdb.com/api/json/v1/1/categories.php`  
- Filter by category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`  
- Lookup full recipe details by ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`  
- Search meal by name: `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`  

---

## Live Demo

Check out the live deployed app on Netlify:

[https://parsa-recipe-discovery-app-sba-10.netlify.app/](https://parsa-recipe-discovery-app-sba-10.netlify.app/)

---

## Notes

- The app includes light/dark theming with persisted preferences and icons using `react-icons`.  
- Favorites management uses Context API with localStorage sync for persistence.  
- Recipe details page fetches and parses ingredients dynamically from API response keys.  
- Search and category filters are implemented with clean routing and state management.