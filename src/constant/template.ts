import { DATE_FORMAT } from '.'

export enum E_FILTER_DATE {
    ALL = 0,
    DATE_RANGE = 1,
    DATE = 2,
    MONTH = 4,
    YEAR = 5,
}

export enum E_DATE_RANGE_SUGGESTION {
    THIS_WEEK = 1,
    LAST_WEEK = 2,
}
export interface IFILTER_DATE {
    id: E_FILTER_DATE
    name: string
    labelName: string
    dateName: string | undefined | null
    formatDate: keyof typeof DATE_FORMAT
}
