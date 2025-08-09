// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";

import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";

const HomePage: React.FC = () => {
  // For simplicity, redirect home to /search or /category/Beef or custom homepage component later
  return <Navigate to="/search" />;
};

const SearchResultsPage: React.FC = () => {
  // Placeholder: will implement search results UI later
  return <div>Search Results Page</div>;
};

function App() {
  return (
    <>
      <Navbar />
      <ThemeToggleButton />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryPage />}
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;