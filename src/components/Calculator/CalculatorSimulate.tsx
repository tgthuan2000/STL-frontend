import clsx from 'clsx'
import { useState } from 'react'
import { buttons } from './constant'

const CalculatorSimulate = () => {
    const [expression, setExpression] = useState('0')

    const handleClick = (value: string) => {
        if (value === 'AC') {
            setExpression('0')
            return
        }

        if (value === '=') {
            return
        }

        setExpression((prev) => {
            if (prev === '0') {
                return value
            }
            return prev + value
        })
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-10 rounded-md border bg-gray-200 p-3 dark:border-slate-900 dark:bg-slate-900'>
                <div className='flex flex-col items-end gap-1 rounded border bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-700'>
                    <div className='text-sm text-gray-400'>11 + 22 =</div>
                    <div className='text-lg font-medium text-gray-700 dark:text-white sm:text-xl'>{expression}</div>
                </div>
                <div className='mx-auto grid w-fit grid-cols-4 place-items-center gap-2'>
                    {buttons.map((button) => (
                        <button
                            key={button.label}
                            type='button'
                            onClick={() => handleClick(button.value)}
                            className={clsx(
                                'inline-block h-16 w-16 rounded-md border sm:text-lg',
                                button?.color ||
                                    'border-gray-300 bg-white hover:bg-gray-300 dark:border-slate-700 dark:bg-slate-700 dark:text-white dark:hover:border-slate-800 dark:hover:bg-slate-800'
                            )}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CalculatorSimulate
