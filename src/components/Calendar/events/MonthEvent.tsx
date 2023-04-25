import React from 'react'
import { Event } from 'react-big-calendar'

interface Props {
    event: Event
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
