import clsx from 'clsx'
import React from 'react'

interface Props {
    title: string
    subTitle?: React.ReactNode
    className?: string
}

const TransactionTitle: React.FC<Props> = (props) => {
    const { title, subTitle, className } = props

    return (
        <div className={clsx('select-none', className)}>
            <h4 className='text-base font-medium'>{title}</h4>
            {subTitle}
        </div>
    )
}

export default TransactionTitle
