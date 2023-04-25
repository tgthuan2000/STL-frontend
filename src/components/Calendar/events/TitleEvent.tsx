import React from 'react'

interface Props {
    title: string
}

const TitleEvent: React.FC<Props> = (props) => {
    const { title } = props
    return <span className='italic'>{title}</span>
}

export default TitleEvent
