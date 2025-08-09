import React from "react"
import { Spinner } from "react-bootstrap" // Importing Bootstrap's Spinner for consistent UI

/**
 * LoadingSpinner Component
 * ------------------------
 * Displays a centered loading spinner to indicate that data is being fetched or processed.
 * Reusable across pages and components where loading states occur.
 */
const LoadingSpinner: React.FC = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center py-4"
        // Flexbox centering ensures spinner is always visually centered horizontally and vertically
        >
            <Spinner
                animation="border" // Circular border animation for a clean loading effect
                role="status" // Accessibility attribute to communicate loading state to screen readers
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingSpinner