import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavLinkItemProps } from '~/@types/layout'

const NavLinkItem: React.FC<NavLinkItemProps> = ({ data, onClick, open = true }) => {
    return (
        <NavLink
            to={data.href}
            onClick={onClick}
            className={({ isActive }) =>
                clsx(
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'hover:text-gray-300 flex gap-2 items-center px-3 py-2 text-sm font-medium rounded-md select-none truncate',
                    !open && 'group-hover:justify-start'
                )
            }
        >
            {({ isActive }) => (
                <>
                    <data.icon
                        className={clsx(isActive ? 'text-gray-300' : 'text-gray-400', 'flex-shrink-0 h-6 w-6')}
                        aria-hidden='true'
                    />
                    <span className={clsx('flex-1', !open && 'group-hover:block hidden')}>{data.name}</span>
                </>
            )}
        </NavLink>
    )
}

export default NavLinkItem
