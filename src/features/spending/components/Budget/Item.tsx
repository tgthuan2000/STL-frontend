import clsx from 'clsx'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BudgetItemProps } from '~/@types/spending'
import LANGUAGE from '~/i18n/language/key'

const BudgetItem: React.FC<BudgetItemProps> = ({ name, textColor, amount, percent, bgColor, isOver, totalAmounts }) => {
    const { t } = useTranslation()
    return (
        <li>
            <div className='mt-2 flex justify-between px-2'>
                <h4 className='font-medium'>{name}</h4>
                <span className={clsx('font-normal', textColor)}>{numeral(amount).format()}</span>
            </div>
            <div className='relative mx-2 my-2 h-4'>
                <div className='absolute h-full w-full rounded-full opacity-30' style={{ background: bgColor }} />
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
                    'mb-4 flex justify-between px-2 font-normal',
                    isOver ? 'text-radical-red-500' : textColor
                )}
            >
                <span>
                    {t(LANGUAGE.SHORT_COST)}: {numeral(totalAmounts).format()} • {numeral(percent).format()}%
                </span>
                <span>
                    {t(LANGUAGE.SHORT_REMAINING)}: {numeral(amount - totalAmounts).format()}
                </span>
            </div>
        </li>
    )
}

export default BudgetItem
