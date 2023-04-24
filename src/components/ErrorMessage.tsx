import React from 'react'
import { ErrorMessageProps } from '~/@types/components'
import AnimateWrap from './AnimateWrap'

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <AnimateWrap>{error && <div className='mt-1 text-sm text-radical-red-700'>{error.message}</div>}</AnimateWrap>
    )
}

export default ErrorMessage
