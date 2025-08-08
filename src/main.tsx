import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { FavoritesProvider } from './contexts/FavoritesContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>,
)
