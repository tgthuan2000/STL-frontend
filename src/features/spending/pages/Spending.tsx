import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenu, ButtonMenuMobile } from '~/components'
import { menuSpendingPages, menuSpendingPC } from '~/constant/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

const Spending = () => {
    const { width } = useWindowSize()
    const { loading } = useLoading()

    if (loading.config) return null

    return (
        <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Suspense fallback={<div className='text-gray-900 dark:text-white'>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            {width >= 1280 ? (
                <AsideButtonDesktopWrap>
                    <ButtonMenu data={menuSpendingPC} />
                </AsideButtonDesktopWrap>
            ) : (
                <AsideButtonMobileWrap>
                    <ButtonMenuMobile data={menuSpendingPages} />
                </AsideButtonMobileWrap>
            )}
        </div>
    )
}

export default Spending
