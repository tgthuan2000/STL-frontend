import React from 'react'

interface Props {
    month: string
    year: string
}

const Label: React.FC<Props> = (props) => {
    const { month, year } = props

    return (
        <div className='flex-1'>
            <span className='pointer-events-none select-none text-base font-medium md:text-lg'>
                {month} · {year}
            </span>
        </div>
    )
}

export default Label
