import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import { DATE_FORMAT } from '.'

export enum E_FILTER_DATE {
    ALL = 0,
    DATE_RANGE = 1,
    DATE = 2,
    MONTH = 4,
    YEAR = 5,
}
export interface IFILTER_DATE {
    id: E_FILTER_DATE
    name: string
    labelName: string
    dateName: string | undefined | null
    formatDate: keyof typeof DATE_FORMAT
}

const { t } = i18n
export const TABS_FILTER_DATE: IFILTER_DATE[] = [
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
