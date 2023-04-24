import React from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import clsx from 'clsx'
import './style.css'

const localizer = momentLocalizer(moment)

interface Props {
    className?: string
}

const Calendar: React.FC<Props> = (props) => {
    const { className } = props

    return (
        <div
            className={clsx(
                '-mx-4 h-[calc(100vh-300px)] border bg-white dark:border-slate-700 dark:bg-slate-700 md:h-[calc(100vh-200px)] md:rounded-2xl md:p-6 md:shadow-md lg:mx-auto',
                className
            )}
        >
            <BigCalendar
                localizer={localizer}
                //   events={myEventsList}

                views={['month']}
                startAccessor='start'
                endAccessor='end'
            />
        </div>
    )
}

export default Calendar
