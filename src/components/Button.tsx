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
                    'inline-flex w-auto min-w-[100px] select-none items-center justify-center gap-0.5 whitespace-nowrap rounded-md border py-3 px-4 text-sm font-medium shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 sm:py-2',
                    {
                        'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:hover:bg-indigo-600':
                            color === 'indigo',
                    },
                    {
                        'border-transparent bg-cyan-600 text-white hover:bg-cyan-700 disabled:hover:bg-cyan-600':
                            color === 'cyan',
                    },
                    {
                        'border-transparent bg-green-600 text-white hover:bg-green-700 disabled:hover:bg-green-600':
                            color === 'green',
                    },
                    {
                        'border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:hover:bg-purple-600':
                            color === 'purple',
                    },
                    {
                        'border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600':
                            color === 'blue',
                    },
                    {
                        'border-transparent bg-prussian-blue-600 text-white hover:bg-prussian-blue-700 disabled:hover:bg-prussian-blue-600':
                            color === 'prussianBlue',
                    },
                    {
                        'border-transparent bg-radical-red-600 text-white hover:bg-radical-red-700 disabled:hover:bg-radical-red-600':
                            color === 'radicalRed',
                    },
                    {
                        'border-transparent bg-yellow-600 text-white hover:bg-yellow-700 disabled:hover:bg-yellow-600':
                            color === 'yellow',
                    },
                    {
                        'border-transparent bg-rose-600 text-white hover:bg-rose-700 disabled:hover:bg-rose-600':
                            color === 'rose',
                    },
                    {
                        'border-gray-400 bg-transparent text-gray-500 hover:bg-gray-50 disabled:hover:bg-transparent dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-600 dark:disabled:hover:bg-transparent dark:disabled:hover:opacity-30':
                            color === 'outline',
                    },
                    {
                        'border-indigo-400 bg-transparent text-indigo-500 hover:bg-indigo-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-indigo',
                    },
                    {
                        'border-cyan-400 bg-transparent text-cyan-500 hover:bg-cyan-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-cyan',
                    },
                    {
                        'border-green-400 bg-transparent text-green-500 hover:bg-green-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-green',
                    },
                    {
                        'border-blue-400 bg-transparent text-blue-500 hover:bg-blue-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-blue',
                    },
                    {
                        'border-purple-400 bg-transparent text-purple-500 hover:bg-purple-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-purple',
                    },
                    {
                        'border-prussian-blue-400 bg-transparent text-prussian-blue-500 hover:bg-prussian-blue-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-prussianBlue',
                    },
                    {
                        'border-radical-red-400 bg-transparent text-radical-red-500 hover:bg-radical-red-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
                            color === 'outline-radicalRed',
                    },
                    {
                        'border-yellow-400 bg-transparent text-yellow-500 hover:bg-yellow-50 dark:hover:bg-transparent dark:hover:opacity-70 dark:disabled:hover:opacity-30':
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
