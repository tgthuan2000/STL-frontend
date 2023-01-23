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
            <div className='fixed top-0 left-0 right-0 z-10 md:hidden pl-1 sm:pl-3 h-16 bg-white dark:bg-slate-900'>
                <div className='flex justify-between items-center h-full'>
                    <Logo />
                </div>
            </div>
            <div className='fixed top-16 left-0 right-0 z-10 bg-white dark:bg-slate-900 h-16 border-b dark:border-slate-800'>
                <nav className='flex justify-around items-center h-full'>
                    {_navigation.map((item) => (
                        <NavLinkIcon key={item.href} data={item} />
                    ))}
                </nav>
            </div>
        </>
    )
}

export default TopBar
