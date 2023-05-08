import { memo } from 'react'
import { ButtonMenuMobileV2 } from '~/components/ButtonMenu'
import { useWindowSize } from '~/hook'
import { useMenuLoanMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuLoanMobile = useMenuLoanMobile()

    if (width < 1280) {
        return <ButtonMenuMobileV2 data={menuLoanMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
