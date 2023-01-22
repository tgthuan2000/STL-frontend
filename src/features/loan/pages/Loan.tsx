import { Outlet } from 'react-router-dom'
import { ButtonMenu, ButtonMenuMobile } from '~/components'
import { menuLoanPages, menuLoanPC } from '~/constant/components'
import { TEMPLATE } from '~/constant/template'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

const Loan = () => {
    const { loading } = useLoading()
    const { width } = useWindowSize()

    if (loading.config) return <div className='text-gray-900 dark:text-slate-200'>{TEMPLATE.LOADING}</div>

    return (
        <>
            <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
                <main className='lg:col-span-12 xl:col-span-11'>
                    <Outlet />
                </main>
                {width >= 1280 ? (
                    <aside className='hidden xl:block xl:col-span-1'>
                        <div className='sticky z-20 top-[70px] space-y-4'>
                            <ButtonMenu data={menuLoanPC} />
                        </div>
                    </aside>
                ) : (
                    <>
                        <div className='h-16' />
                        <aside className='block xl:hidden fixed bottom-0 bg-white dark:bg-slate-700 border-t-2 border-gray-300 dark:border-slate-500 left-0 right-0 h-16'>
                            <ButtonMenuMobile data={menuLoanPages} />
                        </aside>
                    </>
                )}
            </div>
        </>
    )
}

export default Loan
