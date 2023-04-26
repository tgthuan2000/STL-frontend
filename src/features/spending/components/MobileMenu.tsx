import { memo } from 'react'
import { ButtonMenuDesktop } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuMobile = useMenuMobile()

    if (width < 1280) {
        return <ButtonMenuDesktop.v1 data={menuMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
