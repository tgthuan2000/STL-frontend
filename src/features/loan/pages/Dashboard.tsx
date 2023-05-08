import moment from 'moment'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardQueryData } from '~/@types/loan'
import { Box2, Divider, Transaction } from '~/components'
import { TAGS } from '~/constant'
import { useCheck, useConfig } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import { useProfile } from '~/store/auth'
import MobileMenu from '../components/MobileMenu'

const Dashboard = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { getKindSpendingId } = useConfig()

    const [{ recent, paydue, statistic }, fetchData, deleteCache, reload] = useQuery<DashboardQueryData>(
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
        },
        {
            paydue: TAGS.ALTERNATE,
            recent: TAGS.ALTERNATE,
            statistic: TAGS.ALTERNATE,
        }
    )

    useCheck(reload)

    useEffect(() => {
        fetchData()
    }, [])

    const handleReload = () => {
        const res = deleteCache('statistic', 'recent', 'paydue')
        console.log(res)
        reload()
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.LOAN_MANAGEMENT)}>
            <MobileMenu />

            <Divider className='py-6 xl:hidden' dashed />

            {/* Show user */}
            <div className='space-y-6'>
                <Box2
                    label={t(LANGUAGE.STATUS)}
                    data={statistic.data}
                    loading={statistic.loading}
                    onReload={handleReload}
                >
                    {(data) => <Box2.Content1 {...data} />}
                </Box2>

                <Box2
                    label={t(LANGUAGE.NEAR_DEADLINE)}
                    data={paydue.data}
                    loading={paydue.loading}
                    onReload={handleReload}
                >
                    {(data) => <Box2.ContentLoan {...data} />}
                </Box2>

                <Box2
                    label={t(LANGUAGE.TRANSACTION_RECENT)}
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
        </Transaction>
    )
}

export default Dashboard
