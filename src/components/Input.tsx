import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import NumberFormat from 'react-number-format'
import { InputProps } from '~/@types/components'

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, name, type = 'text', error, value, ...props }, ref) => {
        const id = useId()
        const [parent] = useAutoAnimate<HTMLDivElement>()

        return (
            <div className={clsx(className)}>
                {label && (
                    <label htmlFor={id} className='inline-block font-medium text-gray-900'>
                        {label}
                    </label>
                )}
                <div className='mt-1'>
                    <input
                        ref={ref}
                        id={id}
                        type={type}
                        name={name}
                        spellCheck={false}
                        autoComplete='off'
                        className='block p-2 w-full rounded-md border border-gray-300 shadow-sm font-light'
                        value={value}
                        {...props}
                    />
                </div>
                {type === 'number' && (
                    <div className='mt-1 ml-2 text-sm'>
                        <NumberFormat value={value} displayType='text' thousandSeparator />
                    </div>
                )}
                <div ref={parent}>
                    {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                </div>
            </div>
        )
    }
)

export default Input
