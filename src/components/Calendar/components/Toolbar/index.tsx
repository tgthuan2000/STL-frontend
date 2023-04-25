import React from 'react'
import { ToolbarProps, View } from 'react-big-calendar'
import { CalendarEvent } from '../..'
import ButtonGroup from './ButtonGroup'
import Views from './Views'
import Label from './Label'

const Toolbar: React.ComponentType<ToolbarProps<CalendarEvent, object>> = (props) => {
    const { date, label, localizer, onNavigate, onView, view, views, children } = props

    return (
        <div className='mx-5 mb-5 mt-5 flex items-center justify-start gap-6 md:mx-0 md:mt-auto'>
            <ButtonGroup onNavigate={onNavigate} />
            <Label label={label} />
            {/* <Views view={view} views={views as View[]} onView={onView} /> */}
        </div>
    )
}

export default Toolbar
