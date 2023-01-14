import clsx from 'clsx'
import numeral from 'numeral'
import React from 'react'
import { BudgetItemProps } from '~/@types/spending'

const BudgetItem: React.FC<BudgetItemProps> = ({ name, textColor, amount, percent, bgColor, isOver, totalAmounts }) => {
    return (
        <li>
            <div className='flex justify-between px-2 mt-2'>
                <h4 className='font-medium'>{name}</h4>
                <span className={clsx('font-normal', textColor)}>{numeral(amount).format()}</span>
            </div>
            <div className='relative mx-2 my-2 h-4'>
                <div className='absolute w-full h-full rounded-full opacity-30' style={{ background: bgColor }} />
                <div
                    style={{
                        width: `${percent > 100 ? 100 : percent}%`,
                        background: bgColor,
                    }}
                    className='absolute h-full rounded-full transition-all'
                />
            </div>
            <div
                className={clsx(
                    'flex justify-between mb-4 px-2 font-normal',
                    isOver ? 'text-radical-red-500' : textColor
                )}
            >
                <span>
                    CP: {numeral(totalAmounts).format()} • {numeral(percent).format()}%
                </span>
                <span>CL: {numeral(amount - totalAmounts).format()}</span>
            </div>
        </li>
    )
}

export default BudgetItem
