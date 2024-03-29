import { isNil } from 'lodash'
import numeral from 'numeral'
import React from 'react'

interface Props {
    amount: number
    suffix?: React.ReactNode
    fallback?: React.ReactNode
    className?: string | (() => string | undefined)
}

const Amount: React.FC<Props> = (props) => {
    const { amount, suffix, fallback, className } = props

    if (isNil(amount)) {
        return <>{fallback}</>
    }

    return (
        <span className={typeof className === 'function' ? className() : className}>
            {numeral(amount).format()}
            {suffix}
        </span>
    )
}

export default Amount
