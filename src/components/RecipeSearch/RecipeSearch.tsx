import React, { type ChangeEvent } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa' // FontAersome search icon

interface RecipeSearchProps {
    searchTerm: string
    onSearchChange: (term: string) => void
    onSearchSubmit: () => void
}

/**
 * RecipeSearch Component
 * ---------------------
 * Controlled search input component with a search button
 * Calls onSearchChange when typing, and onSearchSubmit when the form is submitted
 * Uses React Bootstrap InputGroup and Button with an accessible search icon.
 */
const RecipeSearch: React.FC<RecipeSearchProps> = ({
    searchTerm,
    onSearchChange,
    onSearchSubmit,
}) => {
    // Handle input text changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }

    // Handle form submission (e.g., pressing enter or clicking search)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent page reload
        onSearchSubmit()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control 
                    type='search'
                    placeholder='Search recipes...'
                    aria-label='Search recipes'
                    value={searchTerm}
                    onChange={handleChange}
                />
                <Button variant='primary' type='submit' aria-label='Search'>
                    <FaSearch />
                </Button>
            </InputGroup>
        </Form>
    )
}

export default RecipeSearch