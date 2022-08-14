import { useEffect } from 'react'
import { IUserLoan } from '~/@types/loan'
import { ButtonMenuLoan, Divider } from '~/components'
import { menuLoanMobile } from '~/constant/components'
import { useQuery, useWindowSize } from '~/hook'
import { GET_USER_LOAN_DESC_COUNT_USED } from '~/schema/query/loan'
import useAuth from '~/store/auth'
import { ListMember } from './components'

export interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
    'transfer-from': number[]
    'transfer-to': number[]
}

interface IData {
    member: IUserLoan[]
}

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()

    const [{ member }, fetchData, deleteCache, reload] = useQuery<IData>(
        {
            member: GET_USER_LOAN_DESC_COUNT_USED,
        },
        {
            userId: userProfile?._id as string,
            from: 0,
            to: 10,
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
                <ListMember label='Giao dịch gần đây' data={member.data} loading={member.loading} />

                <ListMember label='Sắp đến hạn trả' data={member.data} loading={member.loading} />

                <ListMember label='Đang vay' data={member.data} loading={member.loading} />

                <ListMember label='Đang cho vay' data={member.data} loading={member.loading} />
            </div>
        </>
    )
}

export default Dashboard
