import React from 'react'
import { ErrorMessageProps } from '~/@types/components'

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return <>{error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}</>
}

export default ErrorMessage
