import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { AutoComplete, DatePicker } from '~/components'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { E_FILTER_DATE, IFILTER_DATE, TABS_FILTER_DATE } from '~/constant/template'
import { find, get, isEmpty } from 'lodash'
import clsx from 'clsx'

type DateRange = [Date, Date]
type FilterDateType = 'isDateRangeFilter' | 'isDateFilter' | 'isMonthFilter' | 'isYearFilter'
interface TimeFilterProps {
    onSubmit: (data: { type: 'dateRange' | 'date' | 'month' | 'year'; data: any } | {}) => void
}
interface IFilterDate {
    date: Date | null
    month: Date | null
    year: Date | null
    dateRange: DateRange | null
    filter: IFILTER_DATE | null
}

const schema = yup.object().shape({
    date: yup.date().nullable(),
    month: yup.date().nullable(),
    year: yup.date().nullable(),
    dateRange: yup.array().of(yup.date().nullable()).nullable(),
    filter: yup.object(),
})

const defaultValues = {
    date: new Date(),
    filter: TABS_FILTER_DATE[0],
}

const TimeFilter: React.FC<TimeFilterProps> = ({ onSubmit }) => {
    const form = useForm<IFilterDate>({
        defaultValues,
        resolver: yupResolver(schema),
    })

    const onsubmit = (data: IFilterDate) => {
        let payload = {}
        const { filter, date, dateRange, month, year } = data
        switch (filter?.id) {
            case E_FILTER_DATE.DATE_RANGE:
                payload = { type: 'dateRange', data: dateRange }
                break
            case E_FILTER_DATE.DATE:
                payload = { type: 'date', data: date }
                break
            case E_FILTER_DATE.MONTH:
                payload = { type: 'month', data: month }
                break
            case E_FILTER_DATE.YEAR:
                payload = { type: 'year', data: year }
                break
            default:
                break
        }
        if (!isEmpty(payload)) onSubmit(payload) // call api
        else console.log(payload) // log
    }

    const filter = form.watch('filter')
    const dateRange = form.watch('dateRange')

    const filterTab = find(TABS_FILTER_DATE, ['id', filter?.id])

    const { isDateRangeFilter, isDateFilter, isMonthFilter, isYearFilter } = useMemo(() => {
        const result: {
            [Property in FilterDateType]: boolean
        } = {
            isDateRangeFilter: false,
            isDateFilter: false,
            isMonthFilter: false,
            isYearFilter: false,
        }

        const fields: {
            [key in E_FILTER_DATE]: FilterDateType
        } = {
            [E_FILTER_DATE.DATE_RANGE]: 'isDateRangeFilter',
            [E_FILTER_DATE.DATE]: 'isDateFilter',
            [E_FILTER_DATE.MONTH]: 'isMonthFilter',
            [E_FILTER_DATE.YEAR]: 'isYearFilter',
        }
        if (filter?.id) {
            const field = fields[filter.id]
            if (field && result.hasOwnProperty(field)) {
                result[field] = true
            }
        }

        return result
    }, [filter])

    const props = useMemo(() => {
        if (!isDateRangeFilter) return {}
        return {
            selectsRange: true,
            startDate: get(dateRange, '[0]', null),
            endDate: get(dateRange, '[1]', null),
            onChange: (dateRange: DateRange) => {
                if (dateRange.some((date) => date === null)) return
                form.handleSubmit(onsubmit)(dateRange as any)
            },
        }
    }, [isDateRangeFilter, dateRange])

    return (
        <div className='flex flex-wrap gap-2 mx-3'>
            <AutoComplete
                idKey='id'
                valueKey='labelName'
                name='filter'
                form={form}
                data={TABS_FILTER_DATE}
                label='Bộ lọc'
                disabledClear
            />
            <div className={clsx(isDateRangeFilter ? 'min-w-[300px]' : 'min-w-[200px]')}>
                <DatePicker
                    showTimeInput={false}
                    form={form}
                    name={get(filterTab, 'name', 'dateRange')}
                    onChange={form.handleSubmit(onsubmit)}
                    showMonthYearPicker={isMonthFilter}
                    showYearPicker={isYearFilter}
                    label={get(filterTab, 'dateName', 'Bộ lọc')}
                    placeholderText='Chọn thời gian'
                    format={get(filterTab, 'formatDate', 'DATE')}
                    {...props}
                />
            </div>
        </div>
    )
}

export default TimeFilter
