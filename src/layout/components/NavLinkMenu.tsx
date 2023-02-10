import { useMemo } from 'react'
import { navigation } from '~/constant/layout'
import { useConfig, useSideBar } from '~/context'
import NavLinkItem from './NavLinkItem'

const NavLinkMenu = () => {
    const { hasPermissions } = useConfig()
    const _navigation = useMemo(
        () => navigation.filter((nav) => hasPermissions(nav.permissions)),
        [navigation, hasPermissions]
    )
    const { desktop } = useSideBar()
    return (
        <>
            {_navigation.map((item) => (
                <NavLinkItem key={item.href} data={item} open={desktop.open} />
            ))}
        </>
    )
}

export default NavLinkMenu
