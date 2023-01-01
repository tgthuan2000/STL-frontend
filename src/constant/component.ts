import { DATE_FORMAT } from '.'

export enum DATA_LIST_MODE {
    TABLE = 1,
    LIST = 2,
}

export enum DATA_LIST_GROUP {
    DATE = 1,
    MONTH = 2,
    YEAR = 3,
}

export const __groupBy = {
    1: DATE_FORMAT.D_DATE,
    2: DATE_FORMAT.MONTH,
    3: DATE_FORMAT.YEAR,
}
