import { forwardRef, useState } from 'react'
import { DateProps } from '~/@types/components'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Input from './Input'
import { useWindowSize } from '~/hook'
import moment from 'moment'

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, DateProps>(({ value, ...props }, ref) => {
    const _value = moment(value).isValid() ? value : undefined
    const { width } = useWindowSize()
    return (
        <DP
            ref={ref}
            dateFormat='dd/MM/yyyy HH:mm'
            timeInputLabel='Time:'
            showTimeInput
            withPortal={width <= 768}
            selected={_value}
            disabledKeyboardNavigation
            shouldCloseOnSelect
            {...props}
            customInput={<Input type='text' value={_value} {...props} />}
        />
    )
})

export default DatePicker
