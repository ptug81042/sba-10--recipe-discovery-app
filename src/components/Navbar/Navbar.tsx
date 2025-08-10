import React from "react"
import { Navbar as RBNavbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap'
import { useTheme } from "../../hooks/useTheme"
import { useSearch } from "../../contexts/search"
import { useNavigate } from "react-router-dom"

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme()
    const { searchQuery, setSearchQuery } = useSearch()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <RBNavbar
            bg={theme === 'light' ? 'light' : 'dark'}
            variant={theme === 'light' ? 'light' : 'dark'}
            expand="lg"
            sticky="top"
        >
            <Container>
                <div><RBNavbar.Brand href="/">Recipe Discovery (Home Page)</RBNavbar.Brand></div>
                <div><RBNavbar.Brand href="/favorites">Favorites</RBNavbar.Brand></div>
                <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
                <RBNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Add nav links if needed */}
                    </Nav>

                    <Form
                        className="d-flex"
                        onSubmit={handleSubmit}
                    >
                        <FormControl 
                            type="search"
                            placeholder="Search recipes"
                            className="me-2"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            aria-label="Search"
                        />
                        <Button
                            variant={theme === 'light' ? 'outline-primary' : 'outline-light'}
                            type="submit"
                        >
                            Search
                        </Button>
                    </Form>
                    <Button
                        variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
                        className="ms-3"
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </Button>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    )
}

export default Navbar