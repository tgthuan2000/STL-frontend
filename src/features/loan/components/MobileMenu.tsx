import { memo } from 'react'
import { ButtonMenuDesktop } from '~/components'
import { useWindowSize } from '~/hook'
import { useMenuLoanMobile } from '~/hook/components'

const MobileMenu = () => {
    const { width } = useWindowSize()
    const menuLoanMobile = useMenuLoanMobile()

    if (width < 1280) {
        return <ButtonMenuDesktop.v1 small data={menuLoanMobile} />
    }

    return <></>
}

export default memo(MobileMenu)
