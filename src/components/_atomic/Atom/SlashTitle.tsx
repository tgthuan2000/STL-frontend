import React from 'react'

interface Props {
    title: string
    subTitle: string
}

const SlashTitle: React.FC<Props> = (props) => {
    const { subTitle, title } = props

    return (
        <div className='flex items-center'>
            <span>{title}</span>/<span className='text-xs'>{subTitle}</span>
        </div>
    )
}

export default SlashTitle
