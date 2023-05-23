import ApexCharts from 'apexcharts'
import { get } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useRef } from 'react'
import { DATE_FORMAT } from '~/constant'
import { useTheme } from '~/context'

interface Props {
    data: any[] | undefined
    loading?: boolean
}

const darkThemeOptions: ApexCharts.ApexOptions = {
    chart: {
        foreColor: 'rgb(226, 232, 240)', //text-slate-200
    },
    grid: {
        borderColor: 'rgb(51, 65, 85)', //text-slate-700
    },
}
const lightThemeOptions: ApexCharts.ApexOptions = {
    chart: {
        foreColor: 'rgb(17, 24, 39)', //text-gray-900
    },
    grid: {
        borderColor: 'rgb(229, 231, 235)', // text-gray-200
    },
}

const TransactionChart: React.FC<Props> = (props) => {
    const { data, loading } = props
    const { isDarkTheme } = useTheme()
    const chart = useRef<ApexCharts | null>(null)
    const chartEl = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const options: ApexCharts.ApexOptions = {
            series: [{ data: [] }],
            chart: {
                type: 'bar',
                fontFamily: 'Lexend',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                labels: { formatter: (date) => moment(date).format('DD') },
                axisTicks: { show: false },
                axisBorder: { show: false },
            },
            tooltip: {
                theme: undefined,
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const dotColor = get(w, `config.series[${seriesIndex}].color`)
                    const date = moment(get(w, `globals.labels[${dataPointIndex}]`)).format(DATE_FORMAT.D_DATE)
                    const amount = numeral(get(w, `globals.series[${seriesIndex}][${dataPointIndex}]`)).format()

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
                labels: { show: true, formatter: (amount) => numeral(amount).format() },
                showForNullSeries: false,
            },
            plotOptions: {
                bar: { borderRadius: 2, dataLabels: { position: 'top' } },
            },
            dataLabels: {
                enabled: false,
                formatter: (amount) => numeral(amount).format(),
                offsetY: -20,
            },
        }

        chart.current = new ApexCharts(chartEl.current, options)
        chart.current.render()

        return () => {
            chart.current?.destroy()
        }
    }, [])

    useEffect(() => {
        if (chart.current && data) {
            chart.current.updateOptions(isDarkTheme ? darkThemeOptions : lightThemeOptions)
            chart.current.updateSeries([
                {
                    data,
                    color: isDarkTheme ? 'rgb(34, 211, 238)' : 'rgb(99, 102, 241)', // text-cyan-400 | text-indigo-500
                },
            ])
        }
    }, [data, isDarkTheme])

    return <div ref={chartEl} />
}

export default TransactionChart
