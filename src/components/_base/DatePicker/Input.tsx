import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { DatePickerInputProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'

const Input = forwardRef<HTMLInputElement, DatePickerInputProps>((props, ref) => {
    const { label, error, className, disabledClear, disabled, field, readOnlyInput, onClick, ...rest } = props
    const id = useId()

    return (
        <div>
            {label && <Label label={label} id={id} />}
            <div className='relative mt-1'>
                <input
                    ref={ref}
                    id={id}
                    type='text'
                    spellCheck={false}
                    autoComplete='off'
                    className={clsx(
                        'block h-10 w-full rounded-md border border-gray-300 bg-white p-2 pr-10 font-light shadow-sm dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200',
                        className
                    )}
                    disabled={disabled}
                    {...rest}
                    readOnly={readOnlyInput}
                />
                {!disabledClear && !disabled && (
                    <span className='absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none'>
                        {field.value && (
                            <XMarkIcon
                                onClick={(e) => {
                                    e.stopPropagation()
                                    field.onChange(null)
                                }}
                                className={'h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-gray-500'}
                                aria-hidden='true'
                            />
                        )}
                    </span>
                )}
                <span
                    className='absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-r-md px-2'
                    onClick={onClick}
                >
                    <CalendarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
            </div>

            <ErrorMessage error={error} />
        </div>
    )
})

export default Input
