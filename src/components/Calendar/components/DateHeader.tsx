import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { DateHeaderProps } from 'react-big-calendar'

const DateHeader: React.ComponentType<DateHeaderProps> = (props) => {
    const { date, label, drilldownView, isOffRange, onDrillDown } = props

    const handleClick = () => {
        console.log('Date Header Clicked')
    }

    return (
        <div className='flex items-center justify-end gap-1 pl-1'>
            {/* <CalendarDaysIcon className='h-4 w-4 text-green-500' /> */}
            <span
                className='cursor-pointer text-sm transition hover:underline hover:opacity-50 sm:text-base'
                onClick={handleClick}
            >
                {label}
            </span>
            {/** Click to go detail */}
        </div>
    )
}

export default DateHeader
