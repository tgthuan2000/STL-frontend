import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenuDesktop, ButtonMenuMobile } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { useMenuTimePC, useMenuTimePages } from '~/hook/components'

const Time = () => {
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
            {width >= 1280 ? <Desktop /> : <></>}
        </div>
    )
}

const Desktop = () => {
    const menuTimePC = useMenuTimePC()

    return (
        <AsideButtonDesktopWrap>
            <ButtonMenuDesktop data={menuTimePC} />
        </AsideButtonDesktopWrap>
    )
}

const Mobile = () => {
    const menuTimePage = useMenuTimePages()

    return (
        <AsideButtonMobileWrap>
            <ButtonMenuMobile data={menuTimePage} />
        </AsideButtonMobileWrap>
    )
}

export default Time
