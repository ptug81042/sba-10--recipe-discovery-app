import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button, Badge, Spinner } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { type RecipeDetailResponse, type RecipeDetails } from "../../types/recipe";
import { useFavorites } from "../../contexts/favorites/useFavorites";

/**
 * RecipeDetails Component
 * ------------------------
 * Fetches and displays detailed information about a single recipe.
 * Integrates with FavoritesContext for managing favorites.
 */
const RecipeDetails: React.FC = () => {
    // Extract recipeId from the URL parameters
    const { recipeId } = useParams<{ recipeId: string }>();

    // Use custom useFetch hook to fetch recipe details by ID
    const { data, loading, error } = useFetch<RecipeDetailResponse>(
        recipeId ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}` : null
    );

    // Access favorites context functions and state
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Handle favorite button click
    const handleFavoriteClick = () => {
        if (!recipeId) return;
        if (isFavorite(recipeId)) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    // Loading spinner while fetching
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status" />
                <p>Loading recipe details...</p>
            </Container>
        );
    }

    // Error display
    if (error) {
        return (
            <Container className="text-center py-5">
                <p className="text-danger">Error loading recipe details: {error}</p>
            </Container>
        );
    }

    // Defensive: no data or meals array empty
    if (!data || !data.meals || data.meals.length === 0) {
        return (
            <Container className="text-center py-5">
                <p>Recipe not found.</p>
            </Container>
        );
    }

    // Extract recipe details (first item in meals array)
    const recipe = data.meals[0];

    // Helper to collect non-empty ingredients and measures as array of strings
    const getIngredients = (): string[] => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}` as keyof RecipeDetails;
            const measureKey = `strMeasure${i}` as keyof RecipeDetails;

            const ingredient = recipe[ingredientKey] as string | null | undefined;
            const measure = recipe[measureKey] as string | null | undefined;

            if (ingredient && ingredient.trim() !== "") {
                const measureText = measure && measure.trim() !== "" ? measure.trim() : "";
                ingredients.push(`${measureText} ${ingredient}`.trim());
            }
        }
        return ingredients;
    };


    const ingredients = getIngredients();

    return (
        <Container className="py-4">
            <Row>
                {/* Recipe Title and Category */}
                <Col>
                    <h1>{recipe.strMeal}</h1>
                    <Badge bg="secondary" className="mb-3">
                        {recipe.strCategory}
                    </Badge>
                </Col>
            </Row>

            <Row>
                {/* Left Column: Recipe Image */}
                <Col md={5}>
                    <Image src={recipe.strMealThumb} alt={recipe.strMeal} fluid rounded />
                    <Button
                        variant={isFavorite(recipeId!) ? "danger" : "outline-danger"}
                        className="mt-3"
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite(recipeId!) ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite(recipeId!) ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                </Col>

                {/* Right Column: Ingredients and Instructions */}
                <Col md={7}>
                    <h4>Ingredients</h4>
                    <ul>
                        {ingredients.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>

                    <h4>Instructions</h4>
                    <p style={{ whiteSpace: "pre-wrap" }}>{recipe.strInstructions}</p>

                    {/* Optional YouTube video link if available */}
                    {recipe.strYoutube && (
                        <a
                            href={recipe.strYoutube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary mt-3"
                        >
                            Watch Video Tutorial
                        </a>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RecipeDetails;