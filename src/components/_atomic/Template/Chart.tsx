import ApexCharts from 'apexcharts'
import { get, isEmpty, merge } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import AnimateWrap from '~/components/AnimateWrap'
import LoadingText from '~/components/Loading/LoadingText'
import { DATE_FORMAT } from '~/constant'
import { useTheme } from '~/context'
import LANGUAGE from '~/i18n/language/key'

type ChartType =
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'

interface Props {
    data: any[] | undefined
    loading?: boolean
    type?: ChartType
    annotations?: ApexAnnotations
}

const darkThemeOptions: ApexCharts.ApexOptions = {
    chart: {
        foreColor: 'rgb(226, 232, 240)', //text-slate-200
    },
    grid: {
        borderColor: 'rgb(51, 65, 85)', //text-slate-700
    },
    dataLabels: {
        style: {
            colors: ['rgb(226, 232, 240)'],
        },
    },
}
const lightThemeOptions: ApexCharts.ApexOptions = {
    chart: {
        foreColor: 'rgb(17, 24, 39)', //text-gray-900
    },
    grid: {
        borderColor: 'rgb(229, 231, 235)', // text-gray-200
    },
    dataLabels: {
        style: {
            colors: ['rgb(17, 24, 39)'],
        },
    },
}

const getOptionsByType = (type: ChartType): ApexCharts.ApexOptions => {
    switch (type) {
        case 'bar': {
            return {
                stroke: {
                    width: 0,
                },
            }
        }
        case 'line': {
            return {
                stroke: {
                    width: 3,
                },
                markers: {
                    size: 5,
                    strokeWidth: 0,
                    hover: {
                        sizeOffset: 3,
                    },
                },
                grid: {
                    padding: {
                        left: 20,
                        right: 20,
                    },
                },
            }
        }
        default: {
            return {}
        }
    }
}

const Chart: React.FC<Props> = (props) => {
    const { data, loading, type = 'bar', annotations } = props
    const { t } = useTranslation()
    const { isDarkTheme } = useTheme()
    const chart = useRef<ApexCharts | null>(null)
    const chartEl = useRef<HTMLDivElement | null>(null)

    /** INITIAL -> just first render */
    useEffect(() => {
        const options: ApexCharts.ApexOptions = {
            series: [{ data: [] }],
            chart: {
                type: 'line',
                fontFamily: 'Lexend',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            xaxis: {
                labels: { formatter: (date) => moment(date).format('DD') },
                axisTicks: { show: false },
                axisBorder: { show: false },
                tooltip: {
                    enabled: false,
                },
                tickAmount: 7,
            },
            tooltip: {
                theme: undefined,
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const dotColor = get(w, `config.series[${seriesIndex}].color`)
                    const { x, y } = get(w, `globals.initialSeries[${seriesIndex}].data[${dataPointIndex}]`, {})
                    const date = moment(x).format(DATE_FORMAT.D_DATE)
                    const amount = numeral(y).format()

                    return /*html*/ `
                        <div class="p-2 flex items-center gap-1 text-gray-900 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 text-xs shadow-md">
                            <span class="inline-block h-1.5 w-1.5 rounded-full" style="background-color:${dotColor};"></span>
                            ${date}: <span class="font-normal dark:text-yellow-500">${amount}</span>
                        </div>
                    `
                },
            },
            grid: {
                show: false,
            },
            yaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: true, formatter: (amount) => numeral(amount).format('0.0a') },
                showForNullSeries: false,
                min: 0,
                max: (max) => max * 1.15, // over 15% of max
                tickAmount: 4,
            },
            plotOptions: {
                // bar: { borderRadius: 0, dataLabels: { position: 'top' } },
            },
            dataLabels: {
                enabled: false,
                formatter: (amount) => numeral(amount).format('0a'),
                offsetY: -20,
            },
        }

        chart.current = new ApexCharts(chartEl.current, options)
        chart.current.render()

        return () => {
            chart.current?.destroy()
        }
    }, [])

    /** DATA, THEME, CHART-TYPE */
    useEffect(() => {
        if (chart.current && data) {
            const themeOptions = isDarkTheme ? darkThemeOptions : lightThemeOptions
            const typeOptions: ApexCharts.ApexOptions = {
                chart: { type },
                ...getOptionsByType(type),
            }
            const noDataOptions: ApexCharts.ApexOptions = {
                grid: {
                    show: !isEmpty(data),
                },
            }
            const dataOptions: ApexCharts.ApexOptions = {
                annotations,
            }

            const options = merge(themeOptions, typeOptions, dataOptions, noDataOptions)
            chart.current.updateOptions(options)
            chart.current.updateSeries([
                {
                    data,
                    color: isDarkTheme ? 'rgb(34, 211, 238)' : 'rgb(99, 102, 241)', // text-cyan-400 | text-indigo-500
                },
            ])
        }
    }, [data, isDarkTheme, type, annotations, t])

    return (
        <AnimateWrap className='relative'>
            <div ref={chartEl} />
            {loading && isEmpty(data) && (
                <div className='absolute inset-0 flex items-center justify-center text-sm sm:text-base'>
                    <LoadingText />
                </div>
            )}
        </AnimateWrap>
    )
}

export default Chart