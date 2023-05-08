import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap } from '~/components'
import { ButtonMenuDesktopV1, ButtonMenuMobileV1 } from '~/components/ButtonMenu'
import LoadingText from '~/components/Loading/LoadingText'
import { useWindowSize } from '~/hook'
import { useMenuAccountPC, useMenuAccountPages } from '~/hook/components'

const Account = () => {
    return (
        <div className='gap-4 lg:grid lg:grid-cols-12 xl:gap-6'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Suspense fallback={<LoadingText />}>
                    <Outlet />
                </Suspense>
            </main>
            <RenderMenu />
        </div>
    )
}

const RenderMenu = () => {
    const { width } = useWindowSize()

    return width >= 1280 ? <Desktop /> : <></>
    // <Mobile />
}

const Desktop = memo(() => {
    const menuAccountPC = useMenuAccountPC()

    return (
        <AsideButtonDesktopWrap>
            <ButtonMenuDesktopV1 data={menuAccountPC} />
        </AsideButtonDesktopWrap>
    )
})

const Mobile = memo(() => {
    const menuAccountPages = useMenuAccountPages()

    return (
        <AsideButtonMobileWrap>
            <ButtonMenuMobileV1 data={menuAccountPages} />
        </AsideButtonMobileWrap>
    )
})

export default Account
