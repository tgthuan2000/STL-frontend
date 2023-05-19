import React from 'react'
import { Link, To } from 'react-router-dom'

interface Props {
    children: React.ReactNode
    to: To
    className?: string
}

const WrapItemLink: React.FC<Props> = (props) => {
    const { children, to, className } = props

    return (
        <li className={className}>
            <Link className='block cursor-pointer py-3 hover:opacity-70' to={to}>
                {children}
            </Link>
        </li>
    )
}

export default WrapItemLink
