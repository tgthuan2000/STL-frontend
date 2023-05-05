import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'

interface Props {
    loading: boolean
    className?: string
}

const LoadingWait: React.FC<Props> = (props) => {
    const { loading, className } = props

    if (!loading) return <></>

    return (
        <ArrowPathIcon
            className={clsx('h-4 w-4 animate-spin cursor-wait text-gray-500 dark:text-slate-200', className)}
        />
    )
}

export default LoadingWait
