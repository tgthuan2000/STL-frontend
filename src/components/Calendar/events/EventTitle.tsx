import moment from 'moment'
import React from 'react'
import { DATE_FORMAT } from '~/constant'
import { CalendarEvent } from '..'

interface Props {
    title: string
    loop: string
    start: string | Date | undefined
    end: string | Date | undefined
}

const EventTitle: React.FC<Props> = (props) => {
    const { title, start, end, loop } = props

    return (
        <div className='flex flex-col'>
            <h4 className='text-lg leading-none'>{title}</h4>
            <div className='flex items-center gap-1'>
                <span className='text-xs font-light'>
                    {moment(start).format(DATE_FORMAT.D_DATE_TIME)} - {moment(end).format(DATE_FORMAT.D_DATE_TIME)}
                </span>
                ·
                <span className='cursor-default text-xs font-light italic text-gray-400 hover:underline hover:opacity-70 dark:text-slate-400'>
                    {loop}
                </span>
            </div>
        </div>
    )
}

export default EventTitle
