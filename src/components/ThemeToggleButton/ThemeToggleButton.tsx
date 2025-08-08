import { Button } from 'react-bootstrap'
import { useTheme } from '../../hooks/useTheme'

// ThemeToggleButton component toggles between light and dark theme
const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
            onClick={toggleTheme}
            aria-label='Toggle light/dark theme'
            className='ms-2'
        >
            {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
    )
}

export default ThemeToggleButton