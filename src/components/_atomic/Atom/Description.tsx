import React from 'react'

interface Props {
    data: string | undefined
    fallback?: React.ReactNode
}

const Description: React.FC<Props> = (props) => {
    const { data, fallback } = props

    if (!data) {
        return <>{fallback}</>
    }

    return (
        <span title={data}>
            {data.split('\n').map((line, index) => (
                <span key={index} className='block w-full truncate'>
                    {line}
                </span>
            ))}
        </span>
    )
}

export default Description
