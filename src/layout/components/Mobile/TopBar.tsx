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
            <div className='sticky -top-16 left-0 right-0 z-10 md:hidden h-32 bg-white dark:bg-slate-900 border-b dark:border-slate-800'>
                <div className='flex justify-between items-center h-1/2 pl-1 sm:pl-3'>
                    <Logo />
                </div>
                <nav className='flex justify-around items-center h-1/2'>
                    {_navigation.map((item) => (
                        <NavLinkIcon key={item.href} data={item} />
                    ))}
                </nav>
            </div>
        </>
    )
}

export default TopBar
