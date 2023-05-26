import React from 'react'

interface Props {
    title: string
    subTitle: string
    hidden?: boolean
}

const SlashTitle: React.FC<Props> = (props) => {
    const { subTitle, title, hidden } = props

    if (hidden) {
        return <></>
    }

    return (
        <div className='flex items-baseline'>
            <span>{title}</span>/<span className='text-xs'>{subTitle}</span>
        </div>
    )
}

export default SlashTitle
