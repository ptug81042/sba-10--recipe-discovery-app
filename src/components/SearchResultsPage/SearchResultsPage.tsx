import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RecipeList from "../RecipeList/RecipeList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { searchRecipes } from "../../services/recipeService";
import type { RecipeSummary } from "../../types/recipe";

import styles from "./styles.module.css";

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setRecipes([]);
            return;
        }

        setLoading(true);
        setError(null);

        searchRecipes(query)
            .then((data) => {
                setRecipes(data);
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch search results");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    if (!query.trim()) {
        return <ErrorMessage message="Please enter a search term." />;
    }

    if (loading) return <LoadingSpinner />;

    if (error) return <ErrorMessage message={error} />;

    if (recipes.length === 0) {
        return (
            <div className={styles.noResults}>
                No recipes found matching "{query}".
            </div>
        );
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Search Results for "{query}"</h2>
            <RecipeList recipes={recipes} />
        </section>
    );
};

export default SearchResultsPage;