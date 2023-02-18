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
                    'inline-flex w-auto min-w-[100px] select-none items-center justify-center gap-0.5 whitespace-nowrap rounded-md border py-3 px-4 text-sm font-medium shadow-sm focus:outline-none disabled:opacity-30 sm:py-2',
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
                    { 'border-transparent bg-yellow-600 text-white hover:bg-yellow-700': color === 'yellow' },
                    {
                        'border-gray-400 bg-transparent text-gray-500 hover:bg-gray-50 dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-600':
                            color === 'outline',
                    },
                    {
                        'border-cyan-400 bg-transparent text-cyan-500 hover:bg-cyan-50 dark:hover:bg-transparent dark:hover:opacity-70':
                            color === 'outline-cyan',
                    },
                    {
                        'border-green-400 bg-transparent text-green-500 hover:bg-green-50 dark:hover:bg-transparent dark:hover:opacity-70':
                            color === 'outline-green',
                    },
                    {
                        'border-blue-400 bg-transparent text-blue-500 hover:bg-blue-50 dark:hover:bg-transparent dark:hover:opacity-70':
                            color === 'outline-blue',
                    },
                    {
                        'border-prussian-blue-400 bg-transparent text-prussian-blue-500 hover:bg-prussian-blue-50 dark:hover:bg-transparent dark:hover:opacity-70':
                            color === 'outline-prussianBlue',
                    },
                    {
                        'border-radical-red-400 bg-transparent text-radical-red-500 hover:bg-radical-red-50 dark:hover:bg-transparent dark:hover:opacity-70':
                            color === 'outline-radicalRed',
                    },
                    {
                        'border-yellow-400 bg-transparent text-yellow-500 hover:bg-yellow-50 dark:hover:bg-transparent dark:hover:opacity-70':
                            color === 'outline-yellow',
                    },
                    className
                )}
            >
                {children}
            </button>
        )
    }
)

export default Button
