import React from 'react'
import { useLabel } from '../../services/components'

interface Props {
    label: string
}

const Label: React.FC<Props> = (props) => {
    const { label } = props
    const [month, year] = label.split(' ')
    const translatedLabel = useLabel(month)

    return (
        <div className='flex-1'>
            <span className='pointer-events-none select-none text-base font-medium md:text-lg'>
                {translatedLabel} · {year}
            </span>
        </div>
    )
}

export default Label
