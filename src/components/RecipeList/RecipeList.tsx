import React from "react"
import { Row, Col } from "react-bootstrap"
import RecipeCard from "../RecipeCard/RecipeCard"
import { type RecipeSummary } from "../../types/recipe"

interface RecipeListProps {
    recipes: RecipeSummary[]
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    if (recipes.length === 0) {
        return (
            <p className="text-center text-muted my-4">
                No recipes found. Try adjusting your search!
            </p>
        )
    }

    return (
        <Row className="g-4">
            {recipes.map((recipe) => (
                <Col
                    key={recipe.idMeal}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                >
                    <RecipeCard recipe={recipe} />
                </Col>
            ))}
        </Row>
    )
}

export default RecipeList