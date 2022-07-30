import { forwardRef, useId } from 'react'
import { DateProps } from '~/@types/components'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useWindowSize } from '~/hook'
import moment from 'moment'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Controller, FieldError } from 'react-hook-form'
import clsx from 'clsx'

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, DateProps>(
    ({ name, form, rules, label, ...props }, ref) => {
        const { width } = useWindowSize()

        return (
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <DP
                        dateFormat='dd/MM/yyyy HH:mm'
                        timeInputLabel='Time:'
                        showTimeInput
                        withPortal={width <= 768}
                        selected={(() => {
                            const value = form.getValues(name)
                            return moment(value).isValid() ? value : undefined
                        })()}
                        disabledKeyboardNavigation
                        shouldCloseOnSelect
                        customInput={<Input error={error} label={label} />}
                        {...field}
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
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
    const id = useId()
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div>
            {label && (
                <label htmlFor={id} className='inline-block font-medium text-gray-900'>
                    {label}
                </label>
            )}
            <div className='mt-1'>
                <input
                    ref={ref}
                    id={id}
                    type='text'
                    spellCheck={false}
                    autoComplete='off'
                    className={clsx(
                        'block p-2 w-full rounded-md border border-gray-300 shadow-sm font-light',
                        className
                    )}
                    {...props}
                />
            </div>

            <div ref={parent}>{error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}</div>
        </div>
    )
})
