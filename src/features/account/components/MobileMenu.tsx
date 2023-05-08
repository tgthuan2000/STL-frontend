import { memo } from 'react'
import { ButtonMenuMobileV2 } from '~/components/ButtonMenu'
import { useWindowSize } from '~/hook'
import { useMenuAccountMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuMobile = useMenuAccountMobile()

    if (width < 1280) {
        return <ButtonMenuMobileV2 data={menuMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
