import React from 'react'

interface Props {
    children: React.ReactNode
}

const WrapContent: React.FC<Props> = (props) => {
    const { children } = props

    return <div className='flex flex-1 flex-col gap-4'>{children}</div>
}

export default WrapContent
