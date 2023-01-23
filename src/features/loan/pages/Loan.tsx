import { Outlet } from 'react-router-dom'
import { AsideButtonDesktopWrap, AsideButtonMobileWrap, ButtonMenu, ButtonMenuMobile } from '~/components'
import { menuLoanPages, menuLoanPC } from '~/constant/components'
import { TEMPLATE } from '~/constant/template'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

const Loan = () => {
    const { loading } = useLoading()
    const { width } = useWindowSize()

    if (loading.config) return <div className='text-gray-900 dark:text-slate-200'>{TEMPLATE.LOADING}</div>

    return (
        <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Outlet />
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
