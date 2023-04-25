import React from 'react'
import { Prose } from '~/components'

interface Props {
    title: string
}

const TitleEvent: React.FC<Props> = (props) => {
    const { title } = props

    return <span className='block w-full truncate text-sm'>{title}</span>
}

export default TitleEvent
