import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useConfig } from '~/context'
import { GET_METHOD_SPENDING_DESC_SURPLUS } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { Method as MethodBox } from '../components'
import { useQuery, useScrollIntoView } from '~/hook'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IMethodSpending } from '~/@types/spending'
import { isEmpty } from 'lodash'

const Method = () => {
    const navigate = useNavigate()
    const { kindSpending } = useConfig()
    const { userProfile } = useAuth()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    const [{ method }, fetchData] = useQuery<{
        method: IMethodSpending[]
    }>(
        {
            method: GET_METHOD_SPENDING_DESC_SURPLUS,
        },
        { userId: userProfile?._id as string }
    )
    useEffect(() => {
        if (!isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

    return (
        <div ref={wrapRef}>
            <div className='flex items-center text-gray-900 space-x-2 sm:mb-2 mb-4 select-none'>
                <ArrowSmLeftIcon
                    className='h-7 w-7 hover:opacity-50 cursor-pointer'
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <h4 className='xl:text-2xl text-xl font-semibold'>Phương thức thanh toán</h4>
            </div>
            <div className=''>
                <Tabs />
            </div>
            <div className='flex xl:flex-row flex-col-reverse gap-4 mt-4'>
                <div className='xl:flex-[1]'>
                    <div
                        ref={parent}
                        className='max-w-lg w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'
                    >
                        <MethodBox data={method.data} loading={method.loading} />
                    </div>
                </div>
                <div className='xl:flex-[2]'>
                    <h4 className=' h-12 rounded-md bg-red-500 xl:sticky xl:top-6 text-white font-medium text-lg py-2 px-4'>
                        Chart
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Method

const tabs: { name: string; href: string; current: boolean }[] = [
    { name: 'Tất cả', href: 'all', current: true },
    { name: 'Hàng ngày', href: 'day', current: false },
    { name: 'Hàng tuần', href: 'week', current: false },
    { name: 'Hàng tháng', href: 'month', current: false },
    { name: 'Hàng năm', href: 'year', current: false },
]

const Tabs = () => {
    const navigate = useNavigate()
    return (
        <div className='block'>
            <div className='border-b border-gray-200'>
                <nav className='-mb-px flex sm:space-x-8 space-x-2' aria-label='Tabs'>
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            to={'?tab-view=' + tab.href}
                            onClick={(e) => {
                                // Update the URL to match the selected tab.
                                e.preventDefault()
                                navigate('?tab-view=' + tab.href, {
                                    replace: true,
                                })
                            }}
                            className={clsx(
                                tab.current
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm select-none'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}
