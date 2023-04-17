import { useMemo } from 'react'
import { useConfig, useSideBar } from '~/context'
import { useNavigation } from '~/hook/layout'
import NavLinkItem from './NavLinkItem'

const NavLinkMenu = () => {
    const { hasPermissions } = useConfig()
    const navigation = useNavigation()
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
