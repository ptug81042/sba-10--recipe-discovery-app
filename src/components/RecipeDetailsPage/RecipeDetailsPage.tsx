// src/pages/RecipeDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetailsById } from "../../services/recipeService";
import { type RecipeDetails } from "../../types/recipe";
import LoadingSpinner from "../../components/Loader/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./RecipeDetailsPage.module.css";

const RecipeDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);

            try {
                const data = await getRecipeDetailsById(id);
                if (data) {
                    setRecipe(data);
                } else {
                    setError("Recipe not found.");
                }
            } catch (err) {
                console.error("Error fetching recipe details:", err);
                setError("Failed to fetch recipe details.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!recipe) return <ErrorMessage message="No recipe data available." />;

    return (
        <div className={styles.recipeDetails}>
            <h1 className={styles.title}>{recipe.strMeal}</h1>

            {recipe.strMealThumb && (
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className={styles.image}
                />
            )}

            <div className={styles.info}>
                <p>
                    <strong>Category:</strong> {recipe.strCategory}
                </p>
                {recipe.strArea && (
                    <p>
                        <strong>Area:</strong> {recipe.strArea}
                    </p>
                )}
                {recipe.strTags && (
                    <p>
                        <strong>Tags:</strong>{" "}
                        {Array.isArray(recipe.strTags)
                            ? recipe.strTags.join(", ")
                            : recipe.strTags}
                    </p>
                )}
            </div>

            {recipe.strInstructions && (
                <div className={styles.section}>
                    <h2>Instructions</h2>
                    <p>{recipe.strInstructions}</p>
                </div>
            )}

            {recipe.ingredients.length > 0 && (
                <div className={styles.section}>
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ing, idx) => (
                            <li key={idx}>
                                {ing.ingredient} — {ing.measure}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailsPage;