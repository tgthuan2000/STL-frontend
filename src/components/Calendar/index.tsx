import clsx from 'clsx'
import moment from 'moment'
import React from 'react'
import { Calendar as BigCalendar, Event, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useMessage } from './services/components'
import './style.css'
import { DateHeader, Header, EventWrapper, Toolbar } from './components'
import { TitleEvent } from './events'

moment.locale('en', { week: { dow: 1 } })

const localizer = momentLocalizer(moment)

interface Props {
    className?: string
}

const randomDate = () => {
    const random = Math.random() > 0.5

    const date = moment()

    if (random) {
        date.add(Math.floor(Math.random() * 10), 'days')
    } else {
        date.subtract(Math.floor(Math.random() * 10), 'days')
    }

    return date.toDate()
}

const randomTitle = () => {
    const titles = ['hehe', 'haha', 'hoho', 'hihi', 'huhu']
    return titles[Math.floor(Math.random() * titles.length)]
}

const randomColor = () => {
    const colors = [
        'text-white bg-blue-500',
        'text-white bg-red-500',
        'text-white bg-green-500',
        'text-white bg-yellow-500',
        'text-gray-900 bg-cyan-200',
        'animate-text border-none bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}

const mocks = Array.from(Array(20)).map(() => {
    const title = randomTitle()
    return {
        end: randomDate(),
        start: randomDate(),
        allDay: Math.random() > 0.5,
        title: <TitleEvent title={title} />,
        resource: {
            tooltip: title,
            color: randomColor(),
        },
    }
})

export interface CalendarResource {
    tooltip: string
    color: string
}
export type CalendarEvent = Omit<Event, 'resource'> & { resource: CalendarResource }

const Calendar: React.FC<Props> = (props) => {
    const { className } = props
    const messages = useMessage()

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
                components={{
                    toolbar: Toolbar as any,
                    month: {
                        // event: MonthEvent as any,
                        header: Header,
                        dateHeader: DateHeader,
                    },
                    eventWrapper: EventWrapper as any,
                }}
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
