import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap } from '~/components'
import { ButtonMenuDesktopV1, ButtonMenuMobileV1 } from '~/components/ButtonMenu'
import LoadingText from '~/components/Loading/LoadingText'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { useMenuSpendingPC, useMenuSpendingPages } from '~/hook/components'

const Spending = () => {
    const { loading } = useLoading()

    if (loading.config) return null

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

    return width >= 1280 ? <Desktop /> : <Mobile />
}

const Desktop = memo(() => {
    const menuSpendingPC = useMenuSpendingPC()

    return (
        <AsideButtonDesktopWrap>
            <ButtonMenuDesktopV1 data={menuSpendingPC} />
        </AsideButtonDesktopWrap>
    )
})

const Mobile = memo(() => {
    const menuSpendingPages = useMenuSpendingPages()

    return (
        <AsideButtonMobileWrap>
            <ButtonMenuMobileV1 data={menuSpendingPages} />
        </AsideButtonMobileWrap>
    )
})

export default Spending
