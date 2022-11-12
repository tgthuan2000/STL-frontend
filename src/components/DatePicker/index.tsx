import { forwardRef, useId } from 'react'
import { DateProps } from '~/@types/components'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useWindowSize } from '~/hook'
import moment from 'moment'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Controller, ControllerRenderProps, FieldError } from 'react-hook-form'
import clsx from 'clsx'
import { XIcon } from '@heroicons/react/outline'
import { DATE_FORMAT } from '~/constant'
import './index.css'

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, DateProps>(
    ({ name, form, rules, label, disabledClear, format = 'DATE_TIME', onChange, ...props }, ref) => {
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
                                {...inputProps}
                                field={field}
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

export interface InputProps {
    error?: FieldError
    label?: string
    className?: string
    disabledClear?: boolean
    disabled?: boolean
    field: ControllerRenderProps<any, string>
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, disabledClear, disabled, field, ...props }, ref) => {
        const id = useId()
        const [closeRef] = useAutoAnimate<HTMLSpanElement>()
        const [parent] = useAutoAnimate<HTMLDivElement>()

        return (
            <div>
                {label && (
                    <label htmlFor={id} className='inline-block font-medium text-gray-900'>
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
                            'block h-10 p-2 w-full rounded-md border border-gray-300 shadow-sm font-light',
                            className
                        )}
                        {...props}
                    />
                    {!disabledClear && !disabled && (
                        <span
                            ref={closeRef}
                            className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'
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
                </div>

                <div ref={parent}>
                    {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                </div>
            </div>
        )
    }
)
