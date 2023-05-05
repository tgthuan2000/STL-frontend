import React from 'react'
import { Prose } from '~/components'

interface Props {
    title: string
    color: string
}

const TitleEvent: React.FC<Props> = (props) => {
    const { title, color } = props

    return (
        <span className='block w-full truncate text-sm' style={{ color }}>
            {title}
        </span>
    )
}

export default TitleEvent
