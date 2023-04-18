import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenuDesktop, ButtonMenuMobile } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useMenuSpendingPages, useMenuSpendingPC } from '~/hook/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

const Spending = () => {
    const { width } = useWindowSize()
    const { loading } = useLoading()

    if (loading.config) return null

    return (
        <div className='gap-4 lg:grid lg:grid-cols-12 xl:gap-6'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Suspense fallback={<LoadingText />}>
                    <Outlet />
                </Suspense>
            </main>
            {width >= 1280 ? <Desktop /> : <Mobile />}
        </div>
    )
}

const Desktop = () => {
    const menuSpendingPC = useMenuSpendingPC()

    return (
        <AsideButtonDesktopWrap>
            <ButtonMenuDesktop data={menuSpendingPC} />
        </AsideButtonDesktopWrap>
    )
}

const Mobile = () => {
    const menuSpendingPages = useMenuSpendingPages()

    return (
        <AsideButtonMobileWrap>
            <ButtonMenuMobile data={menuSpendingPages} />
        </AsideButtonMobileWrap>
    )
}

export default Spending
