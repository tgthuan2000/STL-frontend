import { find } from 'lodash'
import moment from 'moment'
import * as yup from 'yup'
import { E_FILTER_DATE, TABS_FILTER_DATE } from '~/constant/template'

const defaultValues = {
    date: new Date(),
    month: new Date(),
    year: new Date(),
    filter: null,
}

export const getDefaultValues = (searchParams: URLSearchParams) => {
    try {
        const _: { [Property in E_FILTER_DATE]?: string } = {
            [E_FILTER_DATE.DATE]: 'date',
            [E_FILTER_DATE.DATE_RANGE]: 'dateRange',
            [E_FILTER_DATE.MONTH]: 'month',
            [E_FILTER_DATE.YEAR]: 'year',
        }

        let { type, data } = Object.fromEntries([...searchParams]),
            filter = null,
            date = null

        if (type && data) {
            type = JSON.parse(type)
            data = JSON.parse(data)
            filter = find(TABS_FILTER_DATE, ['id', type]) ?? null
            const temp = type && _[Number(type) as E_FILTER_DATE]
            if (temp) {
                date = { [temp]: Array.isArray(data) ? data.map((d) => moment(d).toDate()) : moment(data).toDate() }
            }
        }

        return {
            ...defaultValues,
            ...date,
            filter,
        }
    } catch (error) {
        console.log(error)
    }
}

export const schema = yup.object().shape({
    date: yup.date().nullable(),
    month: yup.date().nullable(),
    year: yup.date().nullable(),
    dateRange: yup.array().of(yup.date().nullable()).nullable(),
    filter: yup.object().nullable(),
})
