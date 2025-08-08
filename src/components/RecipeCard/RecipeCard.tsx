import React from "react"
import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useFavorites } from "../../contexts/favorites/useFavorites"
import type { RecipeSummary } from "../../types/recipe"
import { LinkContainer } from 'react-router-bootstrap'

interface RecipeCardProps {
    recipe: RecipeSummary
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const { idMeal, strMeal, strMealThumb } = recipe
    const { isFavorite, addFavorite, removeFavorite } = useFavorites()

    const favorite = isFavorite(idMeal)

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(idMeal)
        } else {
            addFavorite(idMeal)
        }
    }

    return (
        <Card
            className="mb-3"
            style={{ minWidth: '18rem' }}
        >
            <Card.Img 
                variant="top"
                src={strMealThumb}
                alt={strMeal}
            />
            <Card.Body>
                <Card.Title>{strMeal}</Card.Title>
                <LinkContainer t0={`/recipe/${idMeal}`}>
                    <Button variant="primary" className="me-2">
                        View Details
                    </Button>
                </LinkContainer>
                <Button
                    variant={favorite ? 'danger' : 'outline-danger'}
                    onClick={toggleFavorite}
                >
                    {favorite ? 'Remove Favorite' : 'Add Favorite'}
                </Button>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard