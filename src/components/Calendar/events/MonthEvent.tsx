import React from 'react'
import LoadingText from '~/components/Loading/LoadingText'
import { useDetailDialog } from '~/context'
import { CalendarEvent } from '..'
import EventTitle from './EventTitle'

const EventContent = React.lazy(() => import('./EventContent'))

interface Props {
    event: CalendarEvent
}

const MonthEvent: React.FC<Props> = (props) => {
    const { event } = props
    const { set } = useDetailDialog()

    const handleClick = () => {
        set({
            title: (
                <EventTitle
                    title={event.resource.title}
                    loop={event.resource.loop.name}
                    start={event.start}
                    end={event.end}
                />
            ),
            content: <EventContent id={event.resource._id} />,
            fallback: <LoadingText />,
        })
    }

    return (
        <div className='w-full px-2' onClick={handleClick}>
            {event.title}
        </div>
    )
}

export default MonthEvent
