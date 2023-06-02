import clsx from 'clsx'
import React from 'react'

interface Props {
    title: string
    subTitle: string
    hidden?: boolean
    className?: string
}

const Content: React.FC<Props> = (props) => {
    const { subTitle, title, hidden, className } = props

    if (hidden) {
        return <></>
    }

    return (
        <div className={clsx('flex items-baseline', className)}>
            <span className='truncate'>{title}</span>
            <span className='text-xs'>{subTitle}</span>
        </div>
    )
}

export default Content
