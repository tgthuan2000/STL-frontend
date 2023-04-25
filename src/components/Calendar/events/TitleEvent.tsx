import React from 'react'
import { Prose } from '~/components'

interface Props {
    title: string
}

const TitleEvent: React.FC<Props> = (props) => {
    const { title } = props

    return <Prose className='block w-full truncate text-sm'>{title}</Prose>
}

export default TitleEvent
