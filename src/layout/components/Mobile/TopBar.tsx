import { useMemo } from 'react'
import { navigation, navigationMobile } from '~/constant/layout'
import { useConfig } from '~/context'
import Logo from '../Logo'
import NavLinkIcon from '../NavLinkIcon'

const TopBar = () => {
    const { hasPermissions } = useConfig()
    const _navigation = useMemo(
        () => navigationMobile.filter((nav) => hasPermissions(nav.permissions)),
        [navigation, hasPermissions]
    )
    return (
        <>
            <div className='sticky -top-16 left-0 right-0 z-10 h-32 border-b bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden'>
                <div className='flex h-1/2 items-center justify-between pl-1 sm:pl-3'>
                    <Logo />
                </div>
                <nav className='flex h-1/2 items-center justify-around'>
                    {_navigation.map((item) => (
                        <NavLinkIcon key={item.href} data={item} />
                    ))}
                </nav>
            </div>
        </>
    )
}

export default TopBar
