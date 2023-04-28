import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { find, get, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DateRange, FilterDateType, IFilterDate, TimeFilterPayload, TimeFilterProps } from '~/@types/components'
import { AutoComplete, DatePicker } from '~/components/_base'
import { E_DATE_RANGE_SUGGESTION, E_FILTER_DATE } from '~/constant/template'
import { useDateRangeSuggestions, useTabsFilterDate } from '~/hook/template'
import LANGUAGE from '~/i18n/language/key'
import AnimateWrap from '../AnimateWrap'
import Chip from '../Chip'
import { schema, useDefaultValue } from './service'
import { isValidDateRange } from '~/services'

const TimeFilter: React.FC<TimeFilterProps> = ({ onSubmit, excludes = [] }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { getDefaultValues } = useDefaultValue()
    const form = useForm<IFilterDate>({
        defaultValues: getDefaultValues(searchParams),
        resolver: yupResolver(schema),
    })
    const tabsFilterDate = useTabsFilterDate()
    const dateRangeSuggestions = useDateRangeSuggestions()

    const createParamsUrl = (payload: TimeFilterPayload) => {
        const { id, data } = payload

        const paramsUrl = new URLSearchParams()

        if (id === E_FILTER_DATE.ALL && data === null) {
            paramsUrl.delete('type')
            paramsUrl.delete('data')
        } else {
            paramsUrl.append('type', JSON.stringify(id))
            paramsUrl.append('data', JSON.stringify(data))
        }
        navigate(`?${paramsUrl.toString()}`, { replace: true })
    }

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

        if (!isEmpty(payload)) {
            createParamsUrl(payload as TimeFilterPayload)
            onSubmit(payload as TimeFilterPayload)
        }
    }

    const filter = form.watch('filter')
    const dateRange = form.watch('dateRange')

    const filterTab = find(tabsFilterDate, ['id', filter?.id])

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

    const props = useMemo(() => {
        if (!isDateRangeFilter) return {}
        return {
            selectsRange: true,
            startDate: get(dateRange, '[0]', undefined),
            endDate: get(dateRange, '[1]', undefined),
            onChange: (dateRange: DateRange) => {
                return isValidDateRange(dateRange) && form.handleSubmit(onsubmit)()
            },
        }
    }, [isDateRangeFilter, dateRange])

    const dataOptions = useMemo(() => tabsFilterDate.filter((tab) => !excludes.includes(tab.id)), [excludes])

    return (
        <div className='mx-3 mb-2 flex flex-wrap gap-2'>
            <AutoComplete
                idKey='id'
                valueKey='labelName'
                name='filter'
                form={form}
                data={dataOptions}
                label={t(LANGUAGE.FILTER)}
                onChange={form.handleSubmit(onsubmit)}
            />
            <AnimateWrap>
                {filterTab && (
                    <div className={clsx('transition-all', isDateRangeFilter ? 'min-w-[300px]' : 'min-w-[200px]')}>
                        <DatePicker
                            showTimeInput={false}
                            form={form}
                            name={get(filterTab, 'name', 'dateRange')}
                            onChange={form.handleSubmit(onsubmit)}
                            showMonthYearPicker={isMonthFilter}
                            showYearPicker={isYearFilter}
                            label={get(filterTab, 'dateName', t(LANGUAGE.FILTER))}
                            placeholderText={t(LANGUAGE.PLACEHOLDER_CHOOSE_TIME)}
                            format={get(filterTab, 'formatDate', 'DATE')}
                            disabledClear={!isDateRangeFilter}
                            {...props}
                        />
                    </div>
                )}
                {isDateRangeFilter && !form.getValues('dateRange') && (
                    <div className='my-2 flex gap-2'>
                        {dateRangeSuggestions.map((suggest) => (
                            <Chip key={suggest.id} onClick={() => handleSuggestionClick(suggest.id)}>
                                {suggest.label}
                            </Chip>
                        ))}
                    </div>
                )}
            </AnimateWrap>
        </div>
    )
}

export default TimeFilter
