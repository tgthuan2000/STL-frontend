import { useMemo } from 'react'
import { useConfig } from '~/context'
import NavLinkIcon from '../NavLinkIcon'
import { useNavigationMobile } from '~/hook/layout'
import { Logo } from '~/components'

const TopBar = () => {
    const { hasPermissions } = useConfig()
    const navigationMobile = useNavigationMobile()

    const _navigation = useMemo(
        () => navigationMobile.filter((nav) => hasPermissions(nav.permissions)),
        [navigationMobile, hasPermissions]
    )

    return (
        <>
            <div className='sticky -top-16 left-0 right-0 z-10 h-32 border-b bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden'>
                <div className='flex h-1/2 items-center justify-between pl-1 sm:pl-3'>
                    <Logo className='text-4xl' />
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
