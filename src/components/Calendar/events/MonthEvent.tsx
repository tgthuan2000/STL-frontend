import React from 'react'
import { Event } from 'react-big-calendar'

interface Props {
    event: Event
}

const MonthEvent: React.FC<Props> = (props) => {
    const { event } = props

    return <div>{event.title}</div>
}

export default MonthEvent
