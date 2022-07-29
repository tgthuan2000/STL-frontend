import { forwardRef, useState } from 'react'
import { DateProps } from '~/@types/components'
import DP, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Input from './Input'
import { useWindowSize } from '~/hook'

const DatePicker = forwardRef<ReactDatePicker<never, undefined>, DateProps>(({ value, ...props }, ref) => {
    const { width } = useWindowSize()
    return (
        <DP
            ref={ref}
            dateFormat='dd/MM/yyyy HH:mm'
            timeInputLabel='Time:'
            showTimeInput
            withPortal={width <= 768}
            selected={value}
            disabledKeyboardNavigation
            shouldCloseOnSelect
            {...props}
            customInput={<Input type='text' value={value} {...props} />}
        />
    )
})

export default DatePicker
