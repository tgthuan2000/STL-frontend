import clsx from 'clsx'
import React from 'react'
import { ChipProps } from '~/@types/components'
import AnimateWrap from './AnimateWrap'

const Chip: React.FC<ChipProps> = ({ children, disabled, hidden, className, onClick }) => {
    return (
        <AnimateWrap>
            {!hidden && (
                <button
                    className={clsx(
                        'cursor-pointer rounded-full px-2 py-1 text-xs transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50',
                        className ? className : 'bg-slate-500 text-white'
                    )}
                    onClick={onClick}
                    disabled={disabled}
                    type='button'
                >
                    {children}
                </button>
            )}
        </AnimateWrap>
    )
}

export default Chip
