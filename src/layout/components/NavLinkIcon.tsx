import clsx from 'clsx'
import React, { Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import { NavLinkItemProps } from '~/@types/layout'

const NavLinkIcon: React.FC<NavLinkItemProps> = ({ data }) => {
    return (
        <NavLink
            to={data.href}
            title={data.name}
            className={({ isActive }) =>
                clsx(
                    isActive ? 'text-radical-red-500 dark:text-cyan-500' : 'text-gray-700 dark:text-slate-400',
                    'relative flex-1 flex justify-center items-center h-full transition-all'
                )
            }
        >
            {({ isActive }) => (
                <>
                    <div className='relative'>
                        <Suspense fallback={<div className='h-5 w-5 bg-gray-500 rounded-full animate-pulse' />}>
                            <data.component />
                        </Suspense>
                    </div>
                    <span
                        className={clsx(
                            'absolute bottom-0 left-0 right-0 h-1 rounded-tl-full rounded-tr-full',
                            isActive
                                ? 'bg-radical-red-500 dark:bg-gradient-to-r dark:from-[#12c2e9] dark:via-[#c471ed] dark:to-[#f64f59] dark:animate-bg-animate dark:bg-400%'
                                : 'bg-transparent'
                        )}
                    />
                </>
            )}
        </NavLink>
    )
}

export default NavLinkIcon
