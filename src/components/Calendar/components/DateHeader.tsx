import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { DateHeaderProps } from 'react-big-calendar'

const DateHeader: React.ComponentType<DateHeaderProps> = (props) => {
    const { date, label, drilldownView, isOffRange, onDrillDown } = props

    return (
        <div className='flex items-center justify-between gap-1 pl-1'>
            <CalendarDaysIcon className='h-4 w-4 text-green-500' />
            <span>{label}</span>
        </div>
    )
}

export default DateHeader
