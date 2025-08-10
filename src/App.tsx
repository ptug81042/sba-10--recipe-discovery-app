// src/App.tsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import RecipeDetailsPage from "./components/RecipeDetailsPage/RecipeDetailsPage";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <ThemeToggleButton />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;