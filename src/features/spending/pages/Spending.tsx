import { Outlet } from 'react-router-dom'
import { ButtonMenu, ButtonMenuMobile } from '~/components'
import { menuSpendingPages, menuSpendingPC } from '~/constant/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

const Spending = () => {
    const { width } = useWindowSize()
    const { loading } = useLoading()

    if (loading.config) return null

    return (
        <>
            <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
                <main className='lg:col-span-12 xl:col-span-11'>
                    <Outlet />
                </main>
                {width >= 1280 ? (
                    <aside className='hidden xl:block xl:col-span-1'>
                        <div className='sticky z-20 top-[70px] space-y-4'>
                            <ButtonMenu data={menuSpendingPC} />
                        </div>
                    </aside>
                ) : (
                    <>
                        <div className='h-16' />
                        <aside className='block xl:hidden fixed bottom-0 bg-white dark:bg-slate-700 border-t-2 border-gray-300 dark:border-slate-500 left-0 right-0 h-16'>
                            <ButtonMenuMobile data={menuSpendingPages} />
                        </aside>
                    </>
                )}
            </div>
        </>
    )
}

export default Spending
