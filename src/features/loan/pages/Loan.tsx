import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenuDesktop, ButtonMenuMobile } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { useMenuLoanPC, useMenuLoanPages } from '~/hook/components'

const Loan = () => {
    const { loading } = useLoading()

    if (loading.config) return <LoadingText />

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
    const menuLoanPC = useMenuLoanPC()

    return (
        <AsideButtonDesktopWrap>
            <ButtonMenuDesktop.v1 data={menuLoanPC} />
        </AsideButtonDesktopWrap>
    )
})

const Mobile = memo(() => {
    const menuLoanPages = useMenuLoanPages()

    return (
        <AsideButtonMobileWrap>
            <ButtonMenuMobile.v1 data={menuLoanPages} />
        </AsideButtonMobileWrap>
    )
})
export default Loan
