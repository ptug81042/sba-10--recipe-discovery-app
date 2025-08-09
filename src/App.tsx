// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";

import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const HomePage: React.FC = () => {
  // For simplicity, redirect home to /search or /category/Beef or custom homepage component later
  return <Navigate to="/search" />;
};

const CategoryPage: React.FC<{ categoryName: string }> = ({ categoryName }) => {
  // You’ll later implement fetching recipes by category here
  // Placeholder until implementation:
  return <div>Category Page for: {categoryName}</div>;
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
            element={<CategoryPageWrapper />}
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </main>
    </>
  );
}

// Helper to get params and pass categoryName as prop
import { useParams } from "react-router-dom";
const CategoryPageWrapper: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  if (!categoryName) return <ErrorMessage message="Category not specified" />;
  return <CategoryPage categoryName={categoryName} />;
};

export default App;