import React from 'react'
import { AutocompleteErrorProps } from '~/@types/components'

const Error: React.FC<AutocompleteErrorProps> = ({ error }) => {
    return <>{error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}</>
}

export default Error
