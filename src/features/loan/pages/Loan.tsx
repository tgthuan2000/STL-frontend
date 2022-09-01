import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'

const ButtonMenu = React.lazy(() => import('~/components').then(({ ButtonMenu }) => ({ default: ButtonMenu })))
const ButtonMenuMobile = React.lazy(() =>
    import('~/components').then(({ ButtonMenuMobile }) => ({ default: ButtonMenuMobile }))
)

const Loan = () => {
    const { loading } = useLoading()
    const { width } = useWindowSize()

    const menu = useMemo(() => {
        return {
            loanPC: async () => {
                const { menuLoanPC } = await import('~/constant/components')
                return await menuLoanPC()
            },
            loanPages: async () => {
                const { menuLoanPages } = await import('~/constant/components')
                return await menuLoanPages()
            },
        }
    }, [])

    if (loading.config) return null

    return (
        <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
            <main className='lg:col-span-12 xl:col-span-11'>
                <Outlet />
            </main>
            {width >= 1280 ? (
                <aside className='hidden xl:block xl:col-span-1'>
                    <div className='sticky z-20 top-6 space-y-4'>
                        <ButtonMenu data={menu.loanPC()} />
                    </div>
                </aside>
            ) : (
                <>
                    <div className='h-16' />
                    <aside className='block xl:hidden fixed bottom-0 bg-white border-t-2 border-gray-300 left-0 right-0 h-16'>
                        <ButtonMenuMobile data={menu.loanPages()} />
                    </aside>
                </>
            )}
        </div>
    )
}

export default Loan
