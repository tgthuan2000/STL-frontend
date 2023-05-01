import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
    loading: boolean
}

const LoadingWait: React.FC<Props> = (props) => {
    const { loading } = props

    if (!loading) return <></>

    return <ArrowPathIcon className='h-4 w-4 animate-spin cursor-wait text-gray-500 dark:text-slate-200' />
}

export default LoadingWait
