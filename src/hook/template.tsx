import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { E_DATE_RANGE_SUGGESTION, E_FILTER_DATE, IFILTER_DATE } from '~/constant/template'
import LANGUAGE from '~/i18n/language/key'

export const useTabsFilterDate = (): IFILTER_DATE[] => {
    const { t } = useTranslation()
    const data: IFILTER_DATE[] = useMemo(() => {
        return [
            {
                id: E_FILTER_DATE.DATE_RANGE,
                name: 'dateRange',
                labelName: t(LANGUAGE.ADVANCE),
                dateName: t(LANGUAGE.DATE_RANGE),
                formatDate: 'DATE',
            },
            {
                id: E_FILTER_DATE.DATE,
                name: 'date',
                labelName: t(LANGUAGE.BY_DAY),
                dateName: t(LANGUAGE.DAY),
                formatDate: 'DATE',
            },
            {
                id: E_FILTER_DATE.MONTH,
                name: 'month',
                labelName: t(LANGUAGE.BY_MONTH),
                dateName: t(LANGUAGE.MONTH),
                formatDate: 'MONTH',
            },
            {
                id: E_FILTER_DATE.YEAR,
                name: 'year',
                labelName: t(LANGUAGE.BY_YEAR),
                dateName: t(LANGUAGE.YEAR),
                formatDate: 'YEAR',
            },
        ]
    }, [t])
    return data
}

export const useDateRangeSuggestions = () => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            { id: E_DATE_RANGE_SUGGESTION.THIS_WEEK, label: t(LANGUAGE.THIS_WEEK) },
            { id: E_DATE_RANGE_SUGGESTION.LAST_WEEK, label: t(LANGUAGE.LAST_WEEK) },
        ]
    }, [t])
    return data
}
