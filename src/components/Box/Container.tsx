import React from 'react'

interface Props {
    children?: React.ReactNode
}

const Container: React.FC<Props> = (props) => {
    const { children } = props

    return <div className='flex flex-col gap-4 lg:flex-row lg:gap-6'>{children}</div>
}

export default Container
