import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenuDesktop, ButtonMenuMobile } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useMenuSpendingPages, useMenuSpendingPC } from '~/hook/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

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
            <ButtonMenuDesktop.v1 data={menuSpendingPC} />
        </AsideButtonDesktopWrap>
    )
})

const Mobile = memo(() => {
    const menuSpendingPages = useMenuSpendingPages()

    return (
        <AsideButtonMobileWrap>
            <ButtonMenuMobile.v1 data={menuSpendingPages} />
        </AsideButtonMobileWrap>
    )
})

export default Spending
