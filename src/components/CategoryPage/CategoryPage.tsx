import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RecipeList from "../RecipeList/RecipeList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { getRecipesByCategory } from "../../services/recipeService";
import type { RecipeSummary } from "../../types/recipe";

import styles from "./styles.module.css";

const CategoryPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!categoryName) return;

        setLoading(true);
        setError(null);

        getRecipesByCategory(categoryName)
            .then((data) => {
                setRecipes(data);
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch recipes");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryName]);

    if (!categoryName) {
        return <ErrorMessage message="Category not specified in URL" />;
    }

    if (loading) return <LoadingSpinner />;

    if (error) return <ErrorMessage message={error} />;

    if (recipes.length === 0) {
        return (
            <div className={styles.noResults}>
                No recipes found for category "{categoryName}".
            </div>
        );
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Category: {categoryName}</h2>
            <RecipeList recipes={recipes} />
        </section>
    );
};

export default CategoryPage;
