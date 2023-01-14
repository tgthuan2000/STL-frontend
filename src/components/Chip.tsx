import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'
import { ChipProps } from '~/@types/components'

const Chip: React.FC<ChipProps> = ({ children, disabled, hidden, onClick }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div ref={parent}>
            {!hidden && (
                <button
                    className='cursor-pointer rounded-full px-2 py-1 text-xs bg-slate-500 text-white hover:opacity-70 transition-opacity disabled:opacity-50'
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
