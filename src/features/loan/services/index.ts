import { isEmpty } from 'lodash'
import moment from 'moment'
import { Services } from '~/@types/loan'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { E_FILTER_DATE } from '~/constant/template'
import {
    GET_RECENT_SPENDING_BY_METHOD_FILTER_DATE_RANGE_TOTAL,
    GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
    GET_RECENT_SPENDING_PAGINATE,
    GET_RECENT_SPENDING_TOTAL,
} from '~/schema/query/spending'
import { service } from '~/services'

export const services: Services = {
    getAll: ({ kindSpendingIds, userId }) => ({
        query: { recent: GET_RECENT_SPENDING_PAGINATE, total: GET_RECENT_SPENDING_TOTAL },
        params: {
            userId,
            kindSpendingIds,
            __fromRecent: 0,
            __toRecent: COUNT_PAGINATE,
        },
        tags: { recent: TAGS.ALTERNATE, total: TAGS.ALTERNATE },
    }),
    getDefaultValue({ searchParams, getAll }) {
        try {
            let query = {
                    recent: GET_RECENT_SPENDING_PAGINATE,
                    total: GET_RECENT_SPENDING_TOTAL,
                },
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = {
                    recent: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
                    total: GET_RECENT_SPENDING_BY_METHOD_FILTER_DATE_RANGE_TOTAL,
                }
                let { type, data } = d
                data = JSON.parse(data)

                switch (Number(type)) {
                    case E_FILTER_DATE.DATE: {
                        params = {
                            startDate: service.getDate(moment(data).toDate(), 'start'),
                            endDate: service.getDate(moment(data).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.DATE_RANGE: {
                        const [startDate, endDate] = data
                        params = {
                            startDate: service.getDate(moment(startDate).toDate(), 'start'),
                            endDate: service.getDate(moment(endDate).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.MONTH: {
                        params = {
                            startDate: service.getDate(moment(data).toDate(), 'start', 'month'),
                            endDate: service.getDate(moment(data).toDate(), 'end', 'month'),
                        }
                        break
                    }
                    case E_FILTER_DATE.YEAR: {
                        params = {
                            startDate: service.getDate(moment(data).toDate(), 'start', 'year'),
                            endDate: service.getDate(moment(data).toDate(), 'end', 'year'),
                        }
                        break
                    }
                }
            }
            return {
                ...getAll,
                query,
                params: { ...getAll.params, ...params },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    },
    filterSubmit(data, { defaultValues, getAll }) {
        const query = {
            recent: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
            total: GET_RECENT_SPENDING_BY_METHOD_FILTER_DATE_RANGE_TOTAL,
        }
        switch (data.id) {
            case E_FILTER_DATE.ALL:
                return getAll

            case E_FILTER_DATE.DATE:
                const date = data.data as Date
                return (prev) => ({
                    ...prev,
                    query,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(date, 'start'),
                        __endDate: service.getDate(date, 'end'),
                    },
                })
            case E_FILTER_DATE.DATE_RANGE:
                const [startDate, endDate] = data.data as Date[]
                return (prev) => ({
                    ...prev,
                    query,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(startDate, 'start'),
                        __endDate: service.getDate(endDate, 'end'),
                    },
                })
            case E_FILTER_DATE.MONTH:
                const month = data.data as Date
                return (prev) => ({
                    ...prev,
                    query,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(month, 'start', 'month'),
                        __endDate: service.getDate(month, 'end', 'month'),
                    },
                })
            case E_FILTER_DATE.YEAR:
                const year = data.data as Date
                return (prev) => ({
                    ...prev,
                    query,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(year, 'start', 'year'),
                        __endDate: service.getDate(year, 'end', 'year'),
                    },
                })
        }
    },
}
