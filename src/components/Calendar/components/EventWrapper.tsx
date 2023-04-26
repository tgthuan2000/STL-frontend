import clsx from 'clsx'
import React from 'react'
import { Components, Event, EventWrapperProps } from 'react-big-calendar'
import { CalendarEvent } from '..'
import MonthEvent from '../events/MonthEvent'

interface HiddenProps {
    continuesAfter: boolean
    continuesPrior: boolean
    children: React.ReactNode
    components: Components<Event, object>
    slotStart: Date
    slotEnd: Date
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void
    onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    resource: string
}

const EventWrapper: React.ComponentType<EventWrapperProps<CalendarEvent> & HiddenProps> = (props) => {
    const { accessors, event, getters, onDoubleClick, selected, continuesAfter, continuesPrior, children, components } =
        props
    // console.log(props)

    return (
        <div
            className={clsx(
                'flex cursor-pointer items-center',
                { 'rounded-l-full': !continuesPrior },
                { 'rounded-r-full': !continuesAfter }
            )}
            style={{ backgroundColor: event.resource.bgColor }}
            title={event.resource.title}
        >
            <MonthEvent event={event} />
            {/* {children} */}
        </div>
    )
}

export default EventWrapper
