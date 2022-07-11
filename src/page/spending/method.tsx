import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MethodData } from '~/@types/spending'
import { useCache, useConfig } from '~/context'
import { F_GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { sum } from '~/util'
import { DataMethodSanity } from './dashboard'
import { Method as MethodBox } from './components'
import _ from 'lodash'

const Method = () => {
    const navigate = useNavigate()
    const { fetchApi } = useCache()
    const { kindSpending } = useConfig()
    const [loadingMethod, setLoadingMethod] = useState(true)
    const { userProfile } = useAuth()
    const [data, setData] = useState<{ method: MethodData[] }>({
        method: [],
    })

    const getData = useCallback(async () => {
        setLoadingMethod(true)

        try {
            if (_.isEmpty(kindSpending)) return

            const params = { userId: userProfile?._id }
            const res = await fetchApi<{ method: DataMethodSanity[] }>(
                { method: F_GET_METHOD_SPENDING(kindSpending) },
                params
            )

            setData({
                method: _.isEmpty(res.method)
                    ? []
                    : res.method.map(
                          ({ cost, receive, 'transfer-from': transferFrom, 'transfer-to': transferTo, ...data }) => ({
                              ...data,
                              cost: sum([...cost, ...transferFrom]),
                              receive: sum([...receive, ...transferTo]),
                          })
                      ),
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingMethod(false)
        }
    }, [kindSpending])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div>
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
                    <div className='max-w-lg w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'>
                        <MethodBox data={data.method} loading={loadingMethod} />
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
