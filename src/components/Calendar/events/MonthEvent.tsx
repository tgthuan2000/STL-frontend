import React from 'react'
import { CalendarEvent } from '..'

interface Props {
    event: CalendarEvent
}

const MonthEvent: React.FC<Props> = (props) => {
    const { event } = props

    const handleClick = () => {
        console.log('Month Event Clicked')
    }

    return (
        <div className='w-full px-2' onClick={handleClick}>
            {event.title}
        </div>
    )
}

export default MonthEvent
