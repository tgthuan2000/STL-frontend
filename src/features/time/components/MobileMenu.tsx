import { memo } from 'react'
import { ButtonMenuMobile } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuTimeMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuTimeMobile = useMenuTimeMobile()

    if (width < 1280) {
        return <ButtonMenuMobile.v2 data={menuTimeMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
