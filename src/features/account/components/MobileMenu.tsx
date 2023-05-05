import { memo } from 'react'
import { ButtonMenuMobile } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuAccountMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuMobile = useMenuAccountMobile()

    if (width < 1280) {
        return <ButtonMenuMobile.v2 data={menuMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
