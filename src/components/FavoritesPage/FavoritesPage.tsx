import React, { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useFavorites } from "../../contexts/favorites/useFavorites";
import { getRecipeDetailsById } from "../../services/recipeService"; // you’d create this
import { type RecipeSummary } from "../../types/recipe";
import styles from './styles.module.css'

const FavoritesPage: React.FC = () => {
    const { favoriteIds } = useFavorites();
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (favoriteIds.length === 0) {
            setRecipes([]);
            return;
        }
        setLoading(true);
        Promise.all(favoriteIds.map(id => getRecipeDetailsById(id)))
            .then(results => setRecipes(results.filter(Boolean) as RecipeSummary[]))
            .finally(() => setLoading(false));
    }, [favoriteIds]);

    if (loading) return <p>Loading favorites...</p>;
    if (recipes.length === 0) return <p>No favorites yet.</p>;

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Favorite Recipes</h1>
                <div className={styles.recipeGrid}>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FavoritesPage;