import clsx from 'clsx'
import { forwardRef } from 'react'
import { ButtonProps } from '~/@types/components'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ type, className, color, children, onClick, disabled, ...props }, ref) => {
        return (
            <button
                {...props}
                onClick={onClick}
                ref={ref}
                type={type}
                disabled={disabled}
                className={clsx(
                    'border min-w-[100px] sm:w-auto w-1/2 inline-flex justify-center rounded-md sm:py-2 py-3 px-4 sm:text-sm text-base font-medium shadow-sm focus:outline-none disabled:opacity-30',
                    { 'border-transparent bg-cyan-600 text-white hover:bg-cyan-700': color === 'cyan' },
                    { 'border-transparent bg-green-600 text-white hover:bg-green-700': color === 'green' },
                    { 'border-transparent bg-blue-600 text-white hover:bg-blue-700': color === 'blue' },
                    {
                        'border-transparent bg-prussian-blue-600 text-white hover:bg-prussian-blue-700':
                            color === 'prussianBlue',
                    },
                    {
                        'border-transparent bg-radical-red-600 text-white hover:bg-radical-red-700':
                            color === 'radicalRed',
                    },
                    { 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50': color === 'outline' },
                    className
                )}
            >
                {children}
            </button>
        )
    }
)

export default Button
