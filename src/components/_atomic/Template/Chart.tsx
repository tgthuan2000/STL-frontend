import ApexCharts from 'apexcharts'
import { get, merge } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
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
            }
        }
        default: {
            return {}
        }
    }
}

const Chart: React.FC<Props> = (props) => {
    const { data, loading, type = 'bar' } = props
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
            yaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: true, formatter: (amount) => numeral(amount).format('0a') },
                showForNullSeries: false,
            },
            plotOptions: {
                bar: { borderRadius: 2, dataLabels: { position: 'top' } },
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
            const dataOptions: ApexCharts.ApexOptions = {
                annotations: {
                    yaxis: [
                        {
                            y: 2000000,
                            borderColor: 'rgb(255, 51, 85)',
                            strokeDashArray: 12,
                            label: {
                                borderColor: 'transparent',
                                style: {
                                    background: 'transparent',
                                    color: 'rgb(255, 51, 85)',
                                    cssClass: 'font-normal text-xs',
                                },
                                text: 'Annotation',
                            },
                        },
                    ],
                },
            }

            const options = merge(themeOptions, typeOptions, dataOptions)
            chart.current.updateOptions(options)
            chart.current.updateSeries([
                {
                    data,
                    color: isDarkTheme ? 'rgb(34, 211, 238)' : 'rgb(99, 102, 241)', // text-cyan-400 | text-indigo-500
                },
            ])
        }
    }, [data, isDarkTheme, type])

    /** NO DATA */
    useEffect(() => {
        if (chart.current) {
            const options: ApexCharts.ApexOptions = {
                noData: {
                    text: t(LANGUAGE.LOADING) as string,
                },
            }
            chart.current.updateOptions(options)
        }
    }, [t])

    return <div ref={chartEl} />
}

export default Chart
