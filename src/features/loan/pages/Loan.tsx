import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenu, ButtonMenuMobile } from '~/components'
import { menuLoanPages, menuLoanPC } from '~/constant/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const Loan = () => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const { width } = useWindowSize()

    if (loading.config) return <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</div>

    return (
        <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Suspense fallback={<div className='text-gray-900 dark:text-white'>{t(LANGUAGE.LOADING)}</div>}>
                    <Outlet />
                </Suspense>
            </main>
            {width >= 1280 ? (
                <AsideButtonDesktopWrap>
                    <ButtonMenu data={menuLoanPC} />
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
