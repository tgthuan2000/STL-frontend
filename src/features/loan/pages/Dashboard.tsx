import moment from 'moment'
import React, { Suspense, useCallback, useEffect } from 'react'
import { IUserLoan } from '~/@types/loan'
import { ISpendingData } from '~/@types/spending'
import { useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import useAuth from '~/store/auth'

const Box2 = React.lazy(() => import('~/components').then(({ Box2 }) => ({ default: Box2 })))
const Box2Content1 = React.lazy(() => import('~/components').then(({ Box2 }) => ({ default: Box2.Content1 })))
const Box2ContentLoan = React.lazy(() => import('~/components').then(({ Box2 }) => ({ default: Box2.ContentLoan })))
const ButtonMenu = React.lazy(() => import('~/components').then(({ ButtonMenu }) => ({ default: ButtonMenu })))
const Divider = React.lazy(() => import('~/components').then(({ Divider }) => ({ default: Divider })))

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

    const menuLoanMobile = useCallback(async () => {
        const { menuLoanMobile } = await import('~/constant/components')
        return await menuLoanMobile()
    }, [])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenu data={menuLoanMobile()} className='min-h-[60px] grid-cols-3' />
                </div>
            )}
            <Divider className='xl:hidden py-6' />

            {/* Show user */}
            <div className='space-y-6'>
                <Box2 label='Trạng thái' data={statistic.data} loading={statistic.loading} onReload={handleReload}>
                    {(data) => <Box2Content1 {...data} />}
                </Box2>

                <Box2 label='Sắp đến hạn trả' data={paydue.data} loading={paydue.loading} onReload={handleReload}>
                    {(data) => <Box2ContentLoan {...data} />}
                </Box2>

                <Box2 label='Giao dịch gần đây' data={recent.data} loading={recent.loading} onReload={handleReload}>
                    {(data) => <Box2ContentLoan {...data} />}
                </Box2>

                {/*
                <ListMember label='Đang vay' data={member.data} loading={member.loading} />

                <ListMember label='Đang cho vay' data={member.data} loading={member.loading} /> */}
            </div>
        </Suspense>
    )
}

export default Dashboard
