import moment from 'moment'
import { useEffect } from 'react'
import { ILoanData } from '~/@types/loan'
import { ButtonMenuLoan, Divider } from '~/components'
import { menuLoanMobile } from '~/constant/components'
import { useQuery, useWindowSize } from '~/hook'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN } from '~/schema/query/loan'
import useAuth from '~/store/auth'
import { Recent, AnimateWrap, PayDue } from './components'

export interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
    'transfer-from': number[]
    'transfer-to': number[]
}

interface IData {
    recent: ILoanData[]
    paydue: ILoanData[]
}

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()

    const [{ recent, paydue }, fetchData, deleteCache, reload] = useQuery<IData>(
        {
            recent: GET_RECENT_LOAN,
            paydue: GET_PAY_DUE_LOAN,
        },
        {
            userId: userProfile?._id as string,
            from: 0,
            to: 10,
            dueDate: moment().utc(true).add(7, 'days').toISOString(),
        }
    )
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenuLoan data={menuLoanMobile} />
                </div>
            )}

            <Divider className='xl:hidden py-6' />

            {/* Show user */}
            <div className='space-y-6'>
                <AnimateWrap>
                    <Recent label='Trạng thái' data={recent.data} loading={recent.loading} />
                </AnimateWrap>

                <AnimateWrap>
                    <PayDue label='Sắp đến hạn trả' data={paydue.data} loading={paydue.loading} />
                </AnimateWrap>

                <AnimateWrap>
                    <PayDue label='Giao dịch gần đây' data={paydue.data} loading={paydue.loading} />
                </AnimateWrap>
                {/*
                <ListMember label='Đang vay' data={member.data} loading={member.loading} />

                <ListMember label='Đang cho vay' data={member.data} loading={member.loading} /> */}
            </div>
        </>
    )
}

export default Dashboard
