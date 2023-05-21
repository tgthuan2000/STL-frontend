import clsx from 'clsx'
import React from 'react'

interface Props {
    className?: string
    fallback?: React.ReactNode
    hidden?: boolean
}

const Dot: React.FC<Props> = (props) => {
    const { className, fallback, hidden } = props

    if (hidden) {
        return <>{fallback}</>
    }

    return <span className={clsx('inline-block h-1.5 w-1.5 rounded-full', className)} />
}

export default Dot
