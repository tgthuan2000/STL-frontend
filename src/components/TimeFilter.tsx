import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { AutoComplete, DatePicker } from '~/components'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { E_FILTER_DATE, IFILTER_DATE, TABS_FILTER_DATE } from '~/constant/template'
import { find, get, isEmpty } from 'lodash'
import clsx from 'clsx'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import moment from 'moment'

type DateRange = [Date, Date]
type FilterDateType = 'isDateRangeFilter' | 'isDateFilter' | 'isMonthFilter' | 'isYearFilter'
interface TimeFilterProps {
    onSubmit: (data: TimeFilterPayload) => void
}
interface IFilterDate {
    date?: Date | null
    month?: Date | null
    year?: Date | null
    dateRange?: DateRange | null
    filter: IFILTER_DATE | null
}
export type TimeFilterPayload = {
    id: number
    data: Date | DateRange | null | undefined
}

const schema = yup.object().shape({
    date: yup.date().nullable(),
    month: yup.date().nullable(),
    year: yup.date().nullable(),
    dateRange: yup.array().of(yup.date().nullable()).nullable(),
    filter: yup.object().nullable(),
})

const defaultValues = {
    date: new Date(),
    month: new Date(),
    year: new Date(),
    filter: null,
}

enum E_DATE_RANGE_SUGGESTION {
    THIS_WEEK = 1,
    LAST_WEEK = 2,
}

const dateRangeSuggestions = [
    { id: E_DATE_RANGE_SUGGESTION.THIS_WEEK, label: 'Tuần này' },
    { id: E_DATE_RANGE_SUGGESTION.LAST_WEEK, label: 'Tuần trước' },
]

const TimeFilter: React.FC<TimeFilterProps> = ({ onSubmit }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const form = useForm<IFilterDate>({
        defaultValues,
        resolver: yupResolver(schema),
    })

    const onsubmit = () => {
        let payload: TimeFilterPayload | null = null

        const { filter, date, dateRange, month, year } = form.watch()
        const id = get(filter, 'id')

        switch (id) {
            case E_FILTER_DATE.DATE_RANGE:
                if (isValidDateRange(dateRange)) payload = { id, data: dateRange }
                break
            case E_FILTER_DATE.DATE:
                if (date) payload = { id, data: date }
                break
            case E_FILTER_DATE.MONTH:
                if (month) payload = { id, data: month }
                break
            case E_FILTER_DATE.YEAR:
                if (year) payload = { id, data: year }
                break
            default:
                payload = {
                    id: E_FILTER_DATE.ALL,
                    data: null,
                }
                break
        }

        if (!isEmpty(payload)) onSubmit(payload as TimeFilterPayload)
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
            [key in E_FILTER_DATE]?: FilterDateType
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

    const handleSuggestionClick = (id: E_DATE_RANGE_SUGGESTION) => {
        const _ = moment()
        switch (id) {
            case E_DATE_RANGE_SUGGESTION.THIS_WEEK:
                form.setValue('dateRange', [_.startOf('isoWeek').toDate(), _.endOf('isoWeek').toDate()])
                break
            case E_DATE_RANGE_SUGGESTION.LAST_WEEK:
                const __ = _.subtract(1, 'week')
                form.setValue('dateRange', [__.startOf('isoWeek').toDate(), __.endOf('isoWeek').toDate()])
                break
            default:
                break
        }
        form.handleSubmit(onsubmit)()
    }

    const isValidDateRange = (dateRange: DateRange | null | undefined) => {
        if (!dateRange) return false
        if (dateRange.some((date) => date === null)) return false
        return true
    }

    const props = useMemo(() => {
        if (!isDateRangeFilter) return {}
        return {
            selectsRange: true,
            startDate: get(dateRange, '[0]', null),
            endDate: get(dateRange, '[1]', null),
            onChange: (dateRange: DateRange) => {
                return isValidDateRange(dateRange) && form.handleSubmit(onsubmit)()
            },
        }
    }, [isDateRangeFilter, dateRange])

    return (
        <div className='mb-2 flex flex-wrap gap-2 mx-3'>
            <AutoComplete
                idKey='id'
                valueKey='labelName'
                name='filter'
                form={form}
                data={TABS_FILTER_DATE}
                label='Bộ lọc'
                onChange={form.handleSubmit(onsubmit)}
            />
            <div ref={parent}>
                {filterTab && (
                    <div className={clsx('transition-all', isDateRangeFilter ? 'min-w-[300px]' : 'min-w-[200px]')}>
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
                            disabledClear={!isDateRangeFilter}
                            {...props}
                        />
                    </div>
                )}
                {isDateRangeFilter && !form.getValues('dateRange') && (
                    <div className='my-2 flex gap-2'>
                        {dateRangeSuggestions.map((suggest) => (
                            <span
                                key={suggest.id}
                                className='cursor-pointer rounded-full px-2 py-1 text-xs bg-slate-500 text-white hover:opacity-70 transition-opacity'
                                onClick={() => handleSuggestionClick(suggest.id)}
                            >
                                {suggest.label}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TimeFilter
