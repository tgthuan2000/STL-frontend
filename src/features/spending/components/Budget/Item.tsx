import clsx from 'clsx'
import numeral from 'numeral'
import React from 'react'
import { BudgetItemProps } from '~/@types/spending'
import { ProgressLine } from '~/components'
import WrapItemLink from '../WrapItemLink'

const BudgetItem: React.FC<BudgetItemProps> = (props) => {
    const { name, textColor, amount, percent, bgColor, to } = props

    return (
        <WrapItemLink to={to}>
            <div className='flex justify-between px-3'>
                <h4 className='font-medium'>{name}</h4>
                <span className={clsx('font-normal', textColor)}>{numeral(amount).format()}</span>
            </div>
            <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} className='mx-3 my-1' />
        </WrapItemLink>
    )
}

export default BudgetItem
