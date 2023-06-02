import React, { lazy } from 'react'
import LoadingText from '~/components/Loading/LoadingText'
import { useDetailDialog } from '~/context'
import { CalendarEvent } from '..'
import EventTitle from './EventTitle'

const EventContent = lazy(() => import('./EventContent'))

interface Props {
    event: CalendarEvent
    append?: boolean
}

const MonthEvent: React.FC<Props> = (props) => {
    const { event, append: isAppend } = props
    const { set, append } = useDetailDialog()

    const handleClick = () => {
        ;(isAppend ? append : set)({
            title: (
                <EventTitle
                    title={event.resource.title}
                    loop={event.resource.loop.name}
                    start={event.start}
                    end={event.end}
                />
            ),
            content: <EventContent id={event.resource._id} />,
            fallback: <LoadingText className='px-6 py-3' />,
        })
    }

    return (
        <div className='w-full px-2' onClick={handleClick}>
            {event.title}
        </div>
    )
}

export default MonthEvent
