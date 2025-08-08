import React from 'react'
import { Alert } from 'react-bootstrap'

interface ErrorMessageProps {
    message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Alert variant='danger' className='my-4' role='alert'>
            {message}
        </Alert>
    )
}

export default ErrorMessage