import clsx from 'clsx'
import moment from 'moment'
import React from 'react'
import { CalendarEvent } from '..'
import { MonthEvent } from '../events'
import { DATE_FORMAT } from '~/constant'

interface Props {
    data: CalendarEvent[]
    current: Date
}

const EventListShowMoreContent: React.FC<Props> = (props) => {
    const { data, current } = props

    return (
        <div className='m-6 flex flex-col gap-3'>
            {data.map((event) => {
                const start = moment(event.start)
                const end = moment(event.end)
                const sameStartDate = start.isSame(moment(current), 'day')
                const sameEndDate = end.isSame(moment(current), 'day')

                return (
                    <div key={event.resource._id} className='flex flex-col'>
                        <span className='text-gray-900 dark:text-slate-200'>
                            {start.format(DATE_FORMAT.D_DATE_TIME)} - {end.format(DATE_FORMAT.D_DATE_TIME)}
                        </span>
                        <div
                            className={clsx(
                                'flex cursor-pointer items-center',
                                { 'rounded-l-full': sameStartDate },
                                { 'rounded-r-full': sameEndDate }
                            )}
                            style={{ backgroundColor: event.resource.bgColor }}
                            title={event.resource.title}
                        >
                            <MonthEvent event={event} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default EventListShowMoreContent
