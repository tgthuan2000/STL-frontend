import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenuDesktop, ButtonMenuMobile } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { useMenuLoanPC, useMenuLoanPages } from '~/hook/components'

const Loan = () => {
    const { loading } = useLoading()
    const { width } = useWindowSize()
    const menuLoanPC = useMenuLoanPC()
    const menuLoanPages = useMenuLoanPages()

    if (loading.config) return <LoadingText />

    return (
        <div className='gap-4 lg:grid lg:grid-cols-12 xl:gap-6'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Suspense fallback={<LoadingText />}>
                    <Outlet />
                </Suspense>
            </main>
            {width >= 1280 ? (
                <AsideButtonDesktopWrap>
                    <ButtonMenuDesktop data={menuLoanPC} />
                </AsideButtonDesktopWrap>
            ) : (
                <AsideButtonMobileWrap>
                    <ButtonMenuMobile data={menuLoanPages} />
                </AsideButtonMobileWrap>
            )}
        </div>
    )
}

export default Loan
