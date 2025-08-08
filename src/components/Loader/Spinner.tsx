import React from "react"
import { Spinner as RBSpinner } from "react-bootstrap"

interface SpinnerProps {
    message?: string
}

const Spinner: React.FC<SpinnerProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="d-flex flex-column align-items-center my-4">
            <RBSpinner animation="border" role="status" variant="primary" />
            <span className="mt-2">{message}</span>
        </div>
    )
}

export default Spinner