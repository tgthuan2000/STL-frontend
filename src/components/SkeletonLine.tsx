import clsx from 'clsx'
import React from 'react'

interface Props {
    className?: string
}

const SkeletonLine: React.FC<Props> = (props) => {
    const { className } = props

    return <span className={clsx('inline-block rounded-full bg-gray-200 dark:bg-slate-700', className)} />
}

export default SkeletonLine
