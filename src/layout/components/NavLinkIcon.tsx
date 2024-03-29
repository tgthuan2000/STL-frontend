import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import { NavLinkIconProps } from '~/@types/layout'

const NavLinkIcon: React.FC<NavLinkIconProps> = ({ data }) => {
    return (
        <NavLink
            to={data.href}
            title={data.name}
            className={({ isActive }) =>
                clsx(
                    isActive ? 'text-radical-red-500 dark:text-cyan-500' : 'text-gray-700 dark:text-slate-400',
                    'relative flex h-full flex-1 items-center justify-center transition-all'
                )
            }
        >
            {({ isActive }) => (
                <>
                    <div className='relative'>
                        <Suspense fallback={<CubeTransparentIcon className='h-5 w-5 animate-pulse' />}>
                            <data.component />
                        </Suspense>
                    </div>
                    {isActive && (
                        <span
                            className={clsx(
                                'absolute bottom-0 left-0 right-0 h-1 rounded-tl-full rounded-tr-full bg-radical-red-500 dark:animate-bg-animate dark:bg-gradient-to-r dark:from-[#12c2e9] dark:via-[#c471ed] dark:to-[#f64f59] dark:bg-400%'
                            )}
                        />
                    )}
                </>
            )}
        </NavLink>
    )
}

export default NavLinkIcon
