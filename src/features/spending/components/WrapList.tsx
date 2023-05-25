import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const WrapList: React.FC<Props> = (props) => {
    const { children } = props
    const [ref] = useAutoAnimate<HTMLUListElement>()

    return (
        <ul
            role='list'
            className='cursor-pointer divide-y text-gray-900 dark:divide-slate-700 dark:text-slate-200'
            ref={ref}
        >
            {children}
        </ul>
    )
}

export default WrapList
