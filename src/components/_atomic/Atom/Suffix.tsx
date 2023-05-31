import clsx from 'clsx'
import React from 'react'

interface Props {
    suffix: React.ReactNode
    fallback?: React.ReactNode
    className?: string
}

const Suffix: React.FC<Props> = (props) => {
    const { suffix, fallback, className } = props

    if (!suffix) {
        return <>{fallback}</>
    }

    return <span className={clsx('text-xs font-light', className)}>{suffix}</span>
}

export default Suffix
