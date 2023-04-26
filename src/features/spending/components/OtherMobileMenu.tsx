import { ButtonMenuDesktop } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuMobileOthers } from '~/hook/components'

const OtherMobileMenu = () => {
    const { width } = useWindowSize()
    const menuMobileOthers = useMenuMobileOthers()

    if (width < 1280) {
        return <ButtonMenuDesktop.v1 small data={menuMobileOthers} />
    }

    return <></>
}

export default OtherMobileMenu
