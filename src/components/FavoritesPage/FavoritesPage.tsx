import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useFavorites } from "../../contexts/favorites/useFavorites"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import type { RecipeSummary, RecipeDetails } from "../../types/recipe"

/**
 * FavoritesPage Component
 * -----------------------
 * Displays all recipes the user has marked as favorites.
 * Fetches detailed recipe data for each favorite ID and 
 * shows them using RecipeCard components.
 */
const FavoritesPage: React.FC = () => {
    // Access favorite recipe IDs from context
    const { favoriteIds } = useFavorites()

    // State to hold full recipe details of favorites
    const [recipes, setRecipes] = useState<RecipeDetails[]>([])

    // Fetch detailed info for each favorite ID sequentially
    useEffect(() => {
        if (favoriteIds.length === 0) {
            setRecipes([])
            return
        }

        // Helper function to fetch details for one recipe ID
        const fetchRecipeDetail = async (id: string): Promise<RecipeDetails | null> => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const json = await response.json()
                if (json.meals && json.meals.length > 0) {
                    return json.meals[0] as RecipeDetails
                }
                return null
            } catch (error) {
                console.error("Failed to fetch recipe detail", error)
                return null
            }
        }

        // Fetch all favorite recipe details in parallel
        Promise.all(favoriteIds.map(id => fetchRecipeDetail(id)))
            .then((results) => {
                // Filter out any null responses
                const validRecipes = results.filter((r): r is RecipeDetails => r !== null)
                setRecipes(validRecipes)
            })
    }, [favoriteIds])

    // Show message if no favorites added yet
    if (favoriteIds.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>No favorite recipes yet</h2>
                <p>Browse recipes and add some to your favorites list!</p>
            </Container>
        )
    }

    // Map RecipeDetail to RecipeSummary for RecipeCard usage
    const recipeSummaries: RecipeSummary[] = recipes.map(recipe => ({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
    }))

    return (
        <Container className="py-4">
            <h2 className="mb-4">Your Favorite Recipes</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {recipeSummaries.map((recipe) => (
                    <Col key={recipe.idMeal}>
                        <RecipeCard recipe={recipe} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default FavoritesPage