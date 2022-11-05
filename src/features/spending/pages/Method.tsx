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
import { isEmpty, map, size } from 'lodash'
import { ResponsiveBar } from '@nivo/bar'
import numeral from 'numeral'

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
            <div className='flex xl:flex-row-reverse flex-col-reverse gap-4 mt-4'>
                {/* <div className='xl:flex-[1]'>
                    <div
                        ref={parent}
                        className='max-w-lg w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'
                    >
                        <MethodBox data={method.data} loading={method.loading} />
                    </div>
                </div> */}
                <div className='xl:flex-[2]'>
                    <h4
                        className='border border-gray-300 bg-white rounded-md xl:sticky xl:top-6 lg:py-2 lg:px-4'
                        style={{ height: size(method.data) * 75 }}
                    >
                        <ResponsiveBar
                            data={map(method.data, ({ name, surplus }) => ({ name, [name]: surplus }))}
                            theme={{ fontFamily: 'Lexend', fontSize: 13 }}
                            keys={map(method.data, 'name')}
                            indexBy='name'
                            margin={{ top: 0, right: 30, bottom: 0, left: 70 }}
                            padding={0.5}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: '#38bcb2',
                                    size: 4,
                                    padding: 1,
                                    stagger: true,
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: '#eed312',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10,
                                },
                            ]}
                            fill={[
                                { match: { id: 'fries' }, id: 'dots' },
                                { match: { id: 'sandwich' }, id: 'lines' },
                            ]}
                            axisBottom={null}
                            borderRadius={3}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 1.7]] }}
                            layout='horizontal'
                            label={(data) => numeral(data.value).format()}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                            role='application'
                            enableGridX={false}
                            enableGridY={false}
                            // isInteractive={false}
                        />
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

const data = [
    {
        country: 'hot dog',
        'hot dog': 68,
    },
    {
        country: 'burger',
        burger: 64,
    },
    {
        country: 'sandwich',
        sandwich: 91,
    },
    {
        country: 'kebab',
        kebab: 129,
    },
    {
        country: 'fries',
        fries: 64,
    },
    {
        country: 'donut',
        donut: 157,
    },
]
