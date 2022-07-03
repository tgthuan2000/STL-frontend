import { useEffect } from 'react'
import { ButtonMenu, Divider } from '~/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { Method, Recent, Transaction } from './components'

const Spending = () => {
    const { setLoading } = useLoading()
    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => timeout && clearTimeout(timeout)
    }, [])

    const { width } = useWindowSize()

    return (
        <>
            <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
                <main className='lg:col-span-12 xl:col-span-10'>
                    {width < 1280 && (
                        <div className='xl:hidden block'>
                            <ButtonMenu />
                        </div>
                    )}

                    <Divider className='xl:hidden' />

                    <Transaction>
                        <div className='xl:space-y-6 space-y-4'>
                            <Transaction.Box title='Giao dịch gần đây'>
                                <Recent />
                            </Transaction.Box>
                        </div>
                        <div className='xl:space-y-6 space-y-4'>
                            <Transaction.Box title='Phương thức thanh toán'>
                                <Method />
                            </Transaction.Box>
                        </div>
                    </Transaction>
                </main>
                {width >= 1280 && (
                    <aside className='hidden xl:block xl:col-span-2'>
                        <div className='sticky top-4 space-y-4'>
                            <ButtonMenu />
                        </div>
                    </aside>
                )}
            </div>
        </>
    )
}

export default Spending
