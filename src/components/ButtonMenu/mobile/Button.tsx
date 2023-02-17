import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { MobileButtonProps } from '../ButtonMenuProvider'

const Button: React.FC<MobileButtonProps> = ({ data, onClick }) => {
    const { title, color, icon: Icon, to, divider } = data
    return (
        <>
            {divider && <div className='h-2/3 w-px bg-gray-300 select-none pointer-events-none' />}
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    clsx(
                        'group w-14 h-14 text-gray-400 inline-flex items-center justify-center flex-col py-2 px-2 space-y-1 border border-transparent font-medium rounded-md focus:outline-none',
                        isActive && color
                    )
                }
                title={title}
            >
                {({ isActive }) => <Icon className={clsx('transition-all', isActive ? 'w-9 h-9' : 'w-7 h-7')} />}
            </NavLink>
        </>
    )
}

export default Button
