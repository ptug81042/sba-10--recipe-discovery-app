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
- **Manage Favorites:** On recipe details, use the "Add to Favorites" or "Remove from Favorites" button to manage your favorite recipes. Favorites persist across sessions.  
- **Theme Toggle:** Switch between light and dark themes using the toggle button. Your preference is saved for future visits.

---

## Reflection

- **Most challenging part:**  
  The most challenging aspect of this project was designing and implementing the `FavoritesContext` with persistence in `localStorage`. Ensuring that favorites were reliably saved and synchronized across multiple components while avoiding unnecessary re-renders required careful use of hooks like `useMemo` and `useCallback`.  
  Additionally, I encountered several issues with fetching and properly using data from the TheMealDB API, particularly handling the API’s nested response structure and inconsistent data formats. Overcoming these required refining TypeScript types and carefully parsing the API responses.

- **Design decision:**  
  I chose to create a custom hook `useFetch` for data fetching to centralize and reuse loading, error, and data state management across different API calls. This abstraction simplified components and improved maintainability by keeping fetch logic consistent and isolated.

---

## TheMealDB API Endpoints Used

- List all categories: `https://www.themealdb.com/api/json/v1/1/categories.php`  
- Filter by category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`  
- Lookup full recipe details by ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`  
- Search meal by name: `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`  

---

## Notes

- No live demo is currently available due to deployment issues on Netlify.