import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import React from 'react'
import { ChipProps } from '~/@types/components'

const Chip: React.FC<ChipProps> = ({ children, disabled, hidden, className, onClick }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div ref={parent}>
            {!hidden && (
                <button
                    className={clsx(
                        'cursor-pointer rounded-full px-2 py-1 text-xs hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed',
                        className ? className : 'bg-slate-500 text-white'
                    )}
                    onClick={onClick}
                    disabled={disabled}
                    type='button'
                >
                    {children}
                </button>
            )}
        </div>
    )
}

export default Chip
