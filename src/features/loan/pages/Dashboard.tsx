import moment from 'moment'
import { useEffect } from 'react'
import { IUserLoan } from '~/@types/loan'
import { ISpendingData } from '~/@types/spending'
import { Box2, ButtonMenuLoan, Divider } from '~/components'
import { menuLoanMobile } from '~/constant/components'
import { useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import useAuth from '~/store/auth'

export interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
    'transfer-from': number[]
    'transfer-to': number[]
}

interface IData {
    recent: ISpendingData[]
    paydue: ISpendingData[]
    statistic: IUserLoan[]
}

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()
    const { getKindSpendingId } = useConfig()

    const [{ recent, paydue, statistic }, fetchData, deleteCache, reload] = useQuery<IData>(
        {
            recent: GET_RECENT_LOAN,
            paydue: GET_PAY_DUE_LOAN,
            statistic: GET_STATISTIC_LOAN,
        },
        {
            userId: userProfile?._id as string,
            from: 0,
            to: 10,
            dueDate: moment().utc(true).add(7, 'days').toISOString(),
            kindLoan: getKindSpendingId('LOAN') as string,
            kindGetLoan: getKindSpendingId('GET_LOAN') as string,
        }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const handleReload = () => {
        const res = deleteCache('statistic', 'recent', 'paydue')
        console.log(res)
        reload()
    }

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
                <Box2 label='Trạng thái' data={statistic.data} loading={statistic.loading} onReload={handleReload}>
                    {(data) => <Box2.Content1 {...data} />}
                </Box2>

                <Box2 label='Sắp đến hạn trả' data={paydue.data} loading={paydue.loading} onReload={handleReload}>
                    {(data) => <Box2.ContentLoan {...data} />}
                </Box2>

                <Box2 label='Giao dịch gần đây' data={recent.data} loading={recent.loading} onReload={handleReload}>
                    {(data) => <Box2.ContentLoan {...data} />}
                </Box2>

                {/*
                <ListMember label='Đang vay' data={member.data} loading={member.loading} />

                <ListMember label='Đang cho vay' data={member.data} loading={member.loading} /> */}
            </div>
        </>
    )
}

export default Dashboard
