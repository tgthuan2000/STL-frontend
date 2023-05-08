import { memo } from 'react'
import { ButtonMenuMobileV2 } from '~/components/ButtonMenu'
import { useWindowSize } from '~/hook'
import { useMenuTimeMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuTimeMobile = useMenuTimeMobile()

    if (width < 1280) {
        return <ButtonMenuMobileV2 data={menuTimeMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
