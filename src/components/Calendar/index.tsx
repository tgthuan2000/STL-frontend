import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useMemo } from 'react'
import { Calendar as BigCalendar, Event as IEvent, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ICalendar } from '~/@types/time'
import { TitleEvent } from './events'
import { useComponents, useMessage } from './services/components'
import './style.css'
import { useParams } from 'react-router-dom'
import { DATE_FORMAT } from '~/constant'

moment.locale('en', { week: { dow: 1 } })
const localizer = momentLocalizer(moment)

export interface CalendarResource extends Omit<ICalendar, 'startDate' | 'endDate'> {}

export type CalendarEvent = Omit<IEvent, 'resource' | 'start' | 'end'> & {
    resource: CalendarResource
    start: Date | string | undefined
    end: Date | string | undefined
}

interface Props {
    className?: string
    data?: ICalendar[]
    loading?: boolean
}

const Calendar: React.FC<Props> = (props) => {
    const { className, data } = props
    const { month } = useParams()
    const messages = useMessage()
    const components = useComponents()

    const refactoredData = useMemo(() => {
        if (!data || isEmpty(data) || !Array.isArray(data)) return []

        const refactored: CalendarEvent[] = data.map(({ _id, bgColor, endDate, loop, startDate, textColor, title }) => {
            return {
                end: endDate,
                start: startDate,
                allDay: true,
                title: <TitleEvent title={title} color={textColor} />,
                resource: {
                    _id,
                    title,
                    loop,
                    bgColor,
                    textColor,
                },
            }
        })
        return refactored
    }, [data])

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
                events={refactoredData}
                views={['month']}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
                defaultDate={month ? moment(month, DATE_FORMAT.MONTH).toDate() : new Date()}
            />
        </div>
    )
}

export default Calendar
