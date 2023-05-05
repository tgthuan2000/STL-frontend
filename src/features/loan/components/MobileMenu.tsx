import { memo } from 'react'
import { ButtonMenuMobile } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuLoanMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuLoanMobile = useMenuLoanMobile()

    if (width < 1280) {
        return <ButtonMenuMobile.v2 data={menuLoanMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
