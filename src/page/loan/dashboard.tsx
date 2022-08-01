import _ from 'lodash'
import { SpendingData, StatisticData } from '~/@types/spending'
import { ButtonMenuLoan, Divider } from '~/components'
import { menuLoanMobile } from '~/constant/components'
import { useWindowSize } from '~/hook'

export interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
    'transfer-from': number[]
    'transfer-to': number[]
}

interface IData {
    recent: SpendingData[]
    method: DataMethodSanity[]
    statistic: StatisticData[]
}

const Dashboard = () => {
    const { width } = useWindowSize()

    return (
        <>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenuLoan data={menuLoanMobile} />
                </div>
            )}

            <Divider className='xl:hidden py-6' />
        </>
    )
}

export default Dashboard
