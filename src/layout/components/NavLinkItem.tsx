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
                    isActive
                        ? 'bg-indigo-500 text-white dark:bg-cyan-500'
                        : 'text-gray-900 hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-slate-800',
                    'flex select-none items-center gap-2 truncate rounded-md px-3 py-2 text-sm font-medium',
                    !open && 'group-hover:justify-start'
                )
            }
        >
            {({ isActive }) => (
                <>
                    <data.icon className='h-6 w-6 flex-shrink-0' aria-hidden='true' />
                    <span className={clsx('flex-1', !open && 'hidden group-hover:block')}>{data.name}</span>
                </>
            )}
        </NavLink>
    )
}

export default NavLinkItem
