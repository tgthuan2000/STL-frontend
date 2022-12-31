import React, { useEffect, useMemo } from 'react'
import { useConfig } from '~/context'
import { GET_METHOD_SPENDING_DESC_SURPLUS } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { useQuery, useScrollIntoView, useWindowSize } from '~/hook'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IMethodSpending } from '~/@types/spending'
import { isEmpty, map, size } from 'lodash'
import { BarSvgProps, ComputedDatum, ResponsiveBar } from '@nivo/bar'
import numeral from 'numeral'
import { TEMPLATE } from '~/constant/template'
import { TAGS } from '~/constant'

const Method = () => {
    const { kindSpending } = useConfig()
    const { userProfile } = useAuth()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const wrapRef = useScrollIntoView<HTMLDivElement>()
    const { width } = useWindowSize()

    const [{ method }, fetchData] = useQuery<{
        method: IMethodSpending[]
    }>({ method: GET_METHOD_SPENDING_DESC_SURPLUS }, { userId: userProfile?._id as string }, { method: TAGS.ALTERNATE })
    useEffect(() => {
        if (!isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

    const isMobileScreen = width < 768

    const dataFilter = useMemo(() => {
        const data = method.data?.filter((item) => item.surplus > 0)
        return data
    }, [method.data])

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
            ) => numeral(data.value).format('0a'),
            labelSkipWidth: 24,
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
                          translateY: size(dataFilter) * 25,
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
        <div ref={wrapRef} className='mt-5'>
            <div
                className='border border-gray-300 bg-white rounded-md xl:sticky xl:top-6 lg:py-2 lg:px-4'
                style={{ height: dataFilter ? size(dataFilter) * 90 : 'auto' }}
                ref={parent}
            >
                {dataFilter ? (
                    <ResponsiveBar {...options} />
                ) : (
                    <div className='animate-pulse p-2'>{TEMPLATE.LOADING}</div>
                )}
            </div>
        </div>
    )
}

export default Method
