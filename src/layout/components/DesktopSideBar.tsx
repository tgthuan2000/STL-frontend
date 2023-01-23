import clsx from 'clsx'
import { useMemo } from 'react'
import { navigation } from '~/constant/layout'
import { useConfig, useSideBar } from '~/context'
import useAuth from '~/store/auth'
import NavLinkItem from './NavLinkItem'
import User from './User'

const DesktopSideBar = () => {
    const { hasPermissions } = useConfig()
    const { removeUserProfile, userProfile } = useAuth()
    const _navigation = useMemo(
        () => navigation.filter((nav) => hasPermissions(nav.permissions)),
        [navigation, hasPermissions]
    )
    const { desktop } = useSideBar()

    return (
        <div
            className={clsx(
                'hidden md:flex md:w-64 group md:flex-col md:fixed md:top-16 md:bottom-0 md:left-0 md:transition-all md:ease-in-out md:duration-300 md:z-10',
                desktop.open ? 'md:w-64' : 'md:w-16 hover:md:w-64'
            )}
        >
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex-1 flex flex-col min-h-0 bg-gray-800'>
                <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto overflow-x-hidden'>
                    <nav className='mt-5 flex-1 px-2 space-y-1'>
                        {_navigation.map((item) => (
                            <NavLinkItem key={item.href} data={item} />
                        ))}
                    </nav>
                </div>
                <User onLogout={removeUserProfile} userProfile={userProfile} />
            </div>
        </div>
    )
}

export default DesktopSideBar
