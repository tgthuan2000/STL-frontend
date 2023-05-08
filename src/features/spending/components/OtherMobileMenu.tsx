import { ButtonMenuMobileV2 } from '~/components/ButtonMenu'
import { useWindowSize } from '~/hook'
import { useMenuMobileOthers } from '~/hook/components'

const OtherMobileMenu = () => {
    const { width } = useWindowSize()
    const menuMobileOthers = useMenuMobileOthers()

    if (width < 1280) {
        return <ButtonMenuMobileV2 data={menuMobileOthers} />
    }

    return <></>
}

export default OtherMobileMenu
