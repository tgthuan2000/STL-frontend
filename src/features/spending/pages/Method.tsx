import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useConfig } from '~/context'
import { GET_METHOD_SPENDING_DESC_SURPLUS } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { Method as MethodBox } from '../components'
import { useQuery, useScrollIntoView, useWindowSize } from '~/hook'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IMethodSpending } from '~/@types/spending'
import { isEmpty, map, size } from 'lodash'
import { BarDatum, BarSvgProps, ComputedDatum, ResponsiveBar } from '@nivo/bar'
import numeral from 'numeral'

const Method = () => {
    const navigate = useNavigate()
    const { kindSpending } = useConfig()
    const { userProfile } = useAuth()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const wrapRef = useScrollIntoView<HTMLDivElement>()
    const { width } = useWindowSize()

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

    const isMobileScreen = width < 768

    const dataFilter = useMemo(() => {
        const data = method.data?.filter((item) => item.surplus > 0)
        return data
    }, [])

    const options = useMemo<
        Omit<BarSvgProps<{ [x: string]: string | number; name: string }>, 'width' | 'height'>
    >(() => {
        return {
            data: map(dataFilter, ({ name, surplus }) => ({ name, [name]: surplus })),
            theme: { fontFamily: 'Lexend', fontSize: 13 },
            keys: map(dataFilter, 'name'),
            indexBy: 'name',
            animate: false,
            margin: {
                top: 0,
                bottom: isMobileScreen ? size(dataFilter) * 30 : 0,
                ...(isMobileScreen ? { right: 20, left: 20 } : { right: 30, left: 100 }),
            },
            padding: 0.5,
            valueScale: { type: 'linear' },
            indexScale: { type: 'band', round: true },
            colors: { scheme: 'nivo' },
            defs: [
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
            ],
            axisLeft: isMobileScreen ? null : undefined,
            axisBottom: null,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: { from: 'color', modifiers: [['darker', 1.7]] },
            layout: 'horizontal',
            label: (
                data: ComputedDatum<{
                    [x: string]: string | number
                    name: string
                }>
            ) => numeral(data.value).format(),
            labelSkipWidth: 12,
            labelSkipHeight: 12,
            labelTextColor: { from: 'color', modifiers: [['darker', 3]] },
            role: 'application',
            enableGridX: false,
            enableGridY: false,
            legends: isMobileScreen
                ? [
                      {
                          dataFrom: 'keys',
                          anchor: 'bottom-left',
                          direction: 'column',
                          justify: false,
                          translateX: 20,
                          translateY: size(data) * 25,
                          itemsSpacing: 5,
                          itemWidth: 100,
                          itemHeight: 20,
                          itemDirection: 'left-to-right',
                          itemOpacity: 0.85,
                          symbolSize: 19,
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemOpacity: 1,
                                  },
                              },
                          ],
                      },
                  ]
                : undefined,
        }
    }, [isMobileScreen, dataFilter])

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
                    <div
                        className='border border-gray-300 bg-white rounded-md xl:sticky xl:top-6 lg:py-2 lg:px-4'
                        style={{ height: dataFilter ? size(dataFilter) * 90 : 'auto' }}
                        ref={parent}
                    >
                        {dataFilter ? (
                            <ResponsiveBar {...options} />
                        ) : (
                            <div className='animate-pulse p-2'>Loading...</div>
                        )}
                    </div>
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
