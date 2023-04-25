import clsx from 'clsx'
import moment from 'moment'
import React from 'react'
import { Calendar as BigCalendar, Event as IEvent, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { mocks } from './services'
import { useComponents, useMessage } from './services/components'
import './style.css'

moment.locale('en', { week: { dow: 1 } })
const localizer = momentLocalizer(moment)

export interface CalendarResource {
    tooltip: string
    color: string
}
export type CalendarEvent = Omit<IEvent, 'resource'> & { resource: CalendarResource }

interface Props {
    className?: string
    data?: any[]
}

const Calendar: React.FC<Props> = (props) => {
    const { className, data } = props
    const messages = useMessage()
    const components = useComponents()

    return (
        <div
            className={clsx(
                '-mx-4 h-[calc(100vh-300px)] border bg-white dark:border-slate-700 dark:bg-slate-700 md:h-[calc(100vh-200px)] md:rounded-2xl md:p-6 md:shadow-md lg:mx-auto',
                className
            )}
        >
            <BigCalendar
                localizer={localizer}
                components={components as any}
                events={mocks}
                views={['month']}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
            />
        </div>
    )
}

export default Calendar
