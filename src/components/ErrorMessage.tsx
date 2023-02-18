import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'
import { ErrorMessageProps } from '~/@types/components'

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return <div ref={parent}>{error && <div className='mt-1 text-sm text-radical-red-700'>{error.message}</div>}</div>
}

export default ErrorMessage
