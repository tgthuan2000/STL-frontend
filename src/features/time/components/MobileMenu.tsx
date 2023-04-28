import { memo } from 'react'
import { ButtonMenuDesktop } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuTimeMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuTimeMobile = useMenuTimeMobile()

    if (width < 1280) {
        return <ButtonMenuDesktop.v2 data={menuTimeMobile} className='mb-5' />
    }

    return <></>
}

export default memo(MobileMenu)
