import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../services/recipeService"; // ✅ Service function to fetch recipes
import { type RecipeSummary } from "../../types/recipe"; // ✅ Strong typing
import RecipeCard from "../RecipeCard/RecipeCard"; // ✅ Assuming you have a RecipeCard component
import styles from "./styles.module.css"; // ✅ CSS module for styling

/**
 * HomePage Component
 * Displays a list of recipes fetched from TheMealDB API.
 * Uses recipeService for data fetching.
 */
const HomePage: React.FC = () => {
    // State for storing all fetched recipes
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);

    // State for tracking loading state
    const [loading, setLoading] = useState<boolean>(true);

    // State for tracking errors
    const [error, setError] = useState<string | null>(null);

    // useEffect to fetch recipes when the component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const data = await getAllRecipes(); // ✅ Call service
                setRecipes(data);
            } catch (err) {
                console.error("Error: ", err);
                setError("Failed to fetch recipes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Loading state UI
    if (loading) {
        return <p className={styles.statusMessage}>Loading recipes...</p>;
    }

    // Error state UI
    if (error) {
        return <p className={styles.statusMessage}>{error}</p>;
    }

    // Main render
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>All Recipes</h1>
            <div className={styles.recipeGrid}>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;