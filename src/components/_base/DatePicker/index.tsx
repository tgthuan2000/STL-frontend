import { DefaultTFuncReturn } from 'i18next'
import moment from 'moment'
import { forwardRef } from 'react'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, FieldError, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Rules, TrackingFunc } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import { useCalendarTranslate, useWindowSize } from '~/hook'
import Header from './Header'
import Input from './Input'
import TimeInput from './TimeInput'
import './index.css'

export interface Props {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Rules
    tracking?: TrackingFunc
    disabledClear?: boolean
    disabled?: boolean
    onChange?: (value: any) => void
    format?: keyof typeof DATE_FORMAT
    showTimeInput?: boolean
    placeholderText?: string | DefaultTFuncReturn
    showMonthYearPicker?: boolean
    showYearPicker?: boolean
    selectsRange?: boolean
    startDate?: Date
    endDate?: Date
    InputProps?: { readOnly?: boolean }
    selectsStart?: boolean
    selectsEnd?: boolean
    minDate?: Date
}

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, Props>((props, ref) => {
    const {
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
        disabled,
        ...rest
    } = props
    const { width } = useWindowSize()
    const { weekday } = useCalendarTranslate()
    const { t } = useTranslation()
    const mobileScreen = width <= 768
    const value = form.watch(name)
    const selected = moment(value).isValid() ? value : undefined

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <DP
                    showPopperArrow={false}
                    calendarStartDay={1} // start date is monday
                    dateFormat={DATE_FORMAT[format]}
                    showTimeInput
                    withPortal={mobileScreen}
                    selected={selected}
                    disabledKeyboardNavigation
                    shouldCloseOnSelect
                    customInput={
                        <Input
                            error={error}
                            label={label}
                            disabledClear={disabledClear}
                            field={field}
                            readOnlyInput={mobileScreen}
                            disabled={disabled}
                        />
                    }
                    {...field}
                    onChange={(date) => {
                        field.onChange(date)
                        onChange?.(date)
                        // tracking?.(name)
                    }}
                    placeholderText={placeholderText as string}
                    {...rest}
                    customTimeInput={<TimeInput />}
                    calendarClassName='bg-gray-50 dark:bg-slate-600 dark:border-slate-800 rounded-md border-gray-200 shadow-md'
                    dayClassName={(date) => 'text-gray-900 dark:text-slate-200'}
                    monthClassName={(date) => 'text-gray-900 dark:text-slate-200'}
                    renderCustomHeader={(params) => <Header {...params} />}
                    weekDayClassName={(date) => 'dark:text-cyan-500 font-normal text-gray-700'}
                    formatWeekDay={(nameOfDay) => weekday[moment(nameOfDay).format('dd')]}
                />
            )}
        />
    )
})

export default DatePicker
