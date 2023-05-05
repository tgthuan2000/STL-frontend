import moment from 'moment'
import { forwardRef } from 'react'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { DateProps } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import { useWindowSize } from '~/hook'
import Input from './Input'
import './index.css'

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, DateProps>(
    (
        {
            name,
            form,
            rules,
            tracking,
            label,
            disabledClear,
            format = 'DATE_TIME',
            onChange,
            InputProps,
            placeholderText,
            ...props
        },
        ref
    ) => {
        const { width } = useWindowSize()

        const inputProps = {
            disabled: props?.disabled,
        }

        const value = form.getValues(name)
        const selected = moment(value).isValid() ? value : undefined

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
                        selected={selected}
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
                            tracking?.(name)
                        }}
                        placeholderText={placeholderText as string}
                        {...props}
                    />
                )}
            />
        )
    }
)

export default DatePicker
