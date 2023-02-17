import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenuDesktop, ButtonMenuMobile } from '~/components'
import { menuSpendingPages, menuSpendingPC } from '~/constant/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const Spending = () => {
    const { t } = useTranslation()
    const { width } = useWindowSize()
    const { loading } = useLoading()

    if (loading.config) return null

    return (
        <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Suspense fallback={<div className='text-gray-900 dark:text-white'>{t(LANGUAGE.LOADING)}</div>}>
                    <Outlet />
                </Suspense>
            </main>
            {width >= 1280 ? (
                <AsideButtonDesktopWrap>
                    <ButtonMenuDesktop data={menuSpendingPC} />
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
