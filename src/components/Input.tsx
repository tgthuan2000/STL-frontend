import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputProps } from '~/@types/components'

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, name, type = 'text', ...props }, ref) => {
    return (
        <div className={clsx(className)}>
            {label && (
                <label htmlFor={name} className='block font-medium text-gray-900'>
                    {label}
                </label>
            )}
            <div className='mt-1'>
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    spellCheck={false}
                    className='block p-2 w-full rounded-md border border-gray-300 shadow-sm'
                    {...props}
                />
            </div>
        </div>
    )
})

export default Input
