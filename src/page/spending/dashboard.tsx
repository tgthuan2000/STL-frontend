import { Divider } from '~/components'
import { menuMobile } from '~/constant/components'
import { useWindowSize } from '~/hook'
import { ButtonMenu, Method, Recent, Transaction } from './components'

const Dashboard = () => {
    const { width } = useWindowSize()

    return (
        <>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenu data={menuMobile} />
                </div>
            )}

            <Divider className='xl:hidden py-6' />

            <Transaction>
                <div className='xl:space-y-6 space-y-4'>
                    <Transaction.Box title='Giao dịch gần đây' to='transaction'>
                        <Recent />
                    </Transaction.Box>
                </div>
                <div className='xl:space-y-6 space-y-4'>
                    <Transaction.Box title='Phương thức thanh toán' to='method'>
                        <Method />
                    </Transaction.Box>
                </div>
            </Transaction>
        </>
    )
}

export default Dashboard
