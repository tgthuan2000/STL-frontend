import clsx from 'clsx'
import { isNil } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { KIND_SPENDING } from '~/constant/spending'

interface Props {
    amount: number
    fallback?: React.ReactNode
    className?: string | (() => string | undefined)
}

const Amount: React.FC<Props> = (props) => {
    const { amount, fallback, className } = props

    if (isNil(amount)) {
        return <>{fallback}</>
    }

    return (
        <span className={clsx('font-medium', typeof className === 'function' ? className() : className)}>
            {numeral(amount).format()}
        </span>
    )
}

export default Amount
