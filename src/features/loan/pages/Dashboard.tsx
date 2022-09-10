import moment from 'moment'
import { useCallback, useEffect } from 'react'
import { lazily } from 'react-lazily'
import { IUserLoan } from '~/@types/loan'
import { ISpendingData } from '~/@types/spending'
import { Box2, Divider } from '~/components'
import { Box2LoanSkeleton, Box2UserLoanSkeleton } from '~/components/Skeleton'
import { useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import useAuth from '~/store/auth'

const { ButtonMenu } = lazily(() => import('~/components'))

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
        <>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenu data={menuLoanMobile()} className='min-h-[60px] grid-cols-3' />
                </div>
            )}
            <Divider className='xl:hidden py-6' />

            {/* Show user */}
            <div className='space-y-6'>
                <Box2
                    label='Trạng thái'
                    fallback={<Box2UserLoanSkeleton />}
                    data={statistic.data}
                    loading={statistic.loading}
                    onReload={handleReload}
                >
                    {(data) => <Box2.Content1 {...data} />}
                </Box2>

                <Box2
                    label='Sắp đến hạn trả'
                    fallback={<Box2LoanSkeleton />}
                    data={paydue.data}
                    loading={paydue.loading}
                    onReload={handleReload}
                >
                    {(data) => <Box2.ContentLoan {...data} />}
                </Box2>

                <Box2
                    label='Giao dịch gần đây'
                    fallback={<Box2LoanSkeleton />}
                    data={recent.data}
                    loading={recent.loading}
                    onReload={handleReload}
                >
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
