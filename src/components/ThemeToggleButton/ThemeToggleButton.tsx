import { Button } from 'react-bootstrap'
import { useTheme } from '../../hooks/useTheme'
import { FaMoon, FaSun } from 'react-icons/fa'

// ThemeToggleButton component toggles between light and dark theme
const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                color: theme === "light" ? "#FFA500" : "#FFF",
            }}
        >
            {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
    )
}

export default ThemeToggleButton