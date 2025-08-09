// This component allows users to filter recipes by category and/or search query.
// It communicates the selected filter options back up to the parent via props.

// ---------------------
// Import dependencies
// ---------------------
import React, { type ChangeEvent } from 'react' // React core + type for input change events
import { Form, Row, Col } from 'react-bootstrap' // Bootstrap layout + form elements

// ---------------------
// Define prop types
// ---------------------
interface RecipeFilterProps {
    categories: string[] // List of recipe categories available for filtering
    selectedCategory: string // The currently chosen category
    onCategoryChange: (category: string) => void // Callback for when category changes
    searchQuery: string // The current search input text
    onSearchChange: (query: string) => void // Callback for when search input changes
    onSearchSubmit?: () => void
}

// ---------------------
// Component definition
// ---------------------
const RecipeFilter: React.FC<RecipeFilterProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
}) => {
    // Handle category dropdown change
    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onCategoryChange(e.target.value) // Pass the selected value up to the parent
    }

    // Handle search box text change
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value) // Pass the typed query up to the parent
    }

    return (
        <Form className='mb-4'>
            {/* Use Bootstrap's grid for a nice responsive filter layout */}
            <Row className='g-3'>
                {/* Category Selector */}
                <Col xs={12} md={4}>
                    <Form.Group controlId='recipeCategory'>
                        <Form.Label>Filter by Category</Form.Label>
                        <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">All Categories</option>
                            {/* Dynamically render category options */}
                            {categories.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Search Box */}
                <Col xs={12} md={8}>
                    <Form.Group controlId='recipeSearch'>
                        <Form.Label>Search Recipes</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Type to search...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

// ---------------------
// Export the componenet
// ---------------------
export default RecipeFilter