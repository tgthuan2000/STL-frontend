import clsx from 'clsx'
import { isNil } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { AutocompleteSurplusProps } from '~/@types/components'
import AnimateWrap from '~/components/AnimateWrap'

const Surplus: React.FC<AutocompleteSurplusProps> = ({ surplus, disabledShowSurplus, surplusName, children }) => {
    return (
        <AnimateWrap>
            {!isNil(surplus) && !disabledShowSurplus && (
                <div className='mt-1 ml-3'>
                    <span className='text-gray-900 dark:text-slate-200'>{surplusName}</span>:{' '}
                    <strong
                        className={clsx(
                            { 'text-green-400': surplus > 0 },
                            { 'text-radical-red-400': surplus < 0 },
                            { 'text-slate-400': surplus === 0 }
                        )}
                    >
                        {numeral(surplus).format()}
                    </strong>
                </div>
            )}
            {children}
        </AnimateWrap>
    )
}

export default Surplus
