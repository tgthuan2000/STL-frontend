import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CalendarIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import moment from 'moment'
import { forwardRef, useId } from 'react'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, ControllerRenderProps, FieldError } from 'react-hook-form'
import { DatePickerInputProps, DateProps } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import { useWindowSize } from '~/hook'
import './index.css'

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, DateProps>(
    ({ name, form, rules, label, disabledClear, format = 'DATE_TIME', onChange, InputProps, ...props }, ref) => {
        const { width } = useWindowSize()

        const inputProps = {
            disabled: props?.disabled,
        }

        return (
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <DP
                        calendarStartDay={1} // start date is monday
                        dateFormat={DATE_FORMAT[format]}
                        timeInputLabel='Time:'
                        showTimeInput
                        withPortal={width <= 768}
                        selected={(() => {
                            const value = form.getValues(name)
                            return moment(value).isValid() ? value : undefined
                        })()}
                        disabledKeyboardNavigation
                        shouldCloseOnSelect
                        customInput={
                            <Input
                                error={error}
                                label={label}
                                disabledClear={disabledClear}
                                field={field}
                                readOnlyInput={width <= 768}
                                {...inputProps}
                            />
                        }
                        {...field}
                        onChange={(date) => {
                            field.onChange(date)
                            onChange?.(date)
                        }}
                        {...props}
                    />
                )}
            />
        )
    }
)

export default DatePicker

const Input = forwardRef<HTMLInputElement, DatePickerInputProps>(
    ({ label, error, className, disabledClear, disabled, field, readOnlyInput, ...props }, ref) => {
        const id = useId()
        const [closeRef] = useAutoAnimate<HTMLSpanElement>()
        const [parent] = useAutoAnimate<HTMLDivElement>()

        return (
            <div>
                {label && (
                    <label htmlFor={id} className='inline-block font-medium text-gray-900 dark:text-slate-100'>
                        {label}
                    </label>
                )}
                <div className='mt-1 relative'>
                    <input
                        ref={ref}
                        id={id}
                        type='text'
                        spellCheck={false}
                        autoComplete='off'
                        className={clsx(
                            'block h-10 p-2 w-full rounded-md border border-gray-300 shadow-sm font-light bg-white dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200',
                            className
                        )}
                        disabled={disabled}
                        {...props}
                        readOnly={readOnlyInput}
                    />
                    {!disabledClear && !disabled && (
                        <span
                            ref={closeRef}
                            className='absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none'
                        >
                            {field.value && (
                                <XIcon
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        field.onChange(null)
                                    }}
                                    className={
                                        'cursor-pointer h-5 w-5 text-gray-400 transition-colors hover:text-gray-500'
                                    }
                                    aria-hidden='true'
                                />
                            )}
                        </span>
                    )}
                    <span className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2'>
                        <CalendarIcon className='cursor-default h-5 w-5 text-gray-400' aria-hidden='true' />
                    </span>
                </div>

                <div ref={parent}>
                    {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                </div>
            </div>
        )
    }
)
