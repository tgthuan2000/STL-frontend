import { isEmpty } from 'lodash'
import moment from 'moment'
import { Services } from '~/@types/profile'
import { TAGS } from '~/constant'
import { E_FILTER_DATE } from '~/constant/template'
import {
    GET_BUDGET_PROFILE_STATISTIC,
    GET_BUDGET_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    GET_CATEGORY_PROFILE_STATISTIC,
    GET_CATEGORY_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    GET_METHOD_PROFILE_STATISTIC,
    GET_METHOD_PROFILE_STATISTIC_FILTER_DATE_RANGE,
} from '~/schema/query/profile'
import { service } from '~/services'

export const services: Services = {
    filterQuery: {
        method: GET_METHOD_PROFILE_STATISTIC_FILTER_DATE_RANGE,
        category: GET_CATEGORY_PROFILE_STATISTIC_FILTER_DATE_RANGE,
        budget: GET_BUDGET_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    },
    getAll: ({ receiveKindIds, costKindIds, userId }) => ({
        query: {
            method: GET_METHOD_PROFILE_STATISTIC,
            category: GET_CATEGORY_PROFILE_STATISTIC,
            budget: GET_BUDGET_PROFILE_STATISTIC,
        },
        params: { userId, receiveKindIds, costKindIds },
        tags: { method: TAGS.ALTERNATE, category: TAGS.ALTERNATE, budget: TAGS.ALTERNATE },
    }),
    getDefaultValue({ searchParams, getAll, receiveCostKindIds }) {
        try {
            let query = getAll.query,
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = services.filterQuery
                let { type, data } = d
                data = JSON.parse(data)

                switch (Number(type)) {
                    case E_FILTER_DATE.DATE_RANGE: {
                        const [startDate, endDate] = data
                        params = {
                            __startDate: service.getDate(moment(startDate).toDate(), 'start'),
                            __endDate: service.getDate(moment(endDate).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.MONTH: {
                        params = {
                            __startDate: service.getDate(moment(data).toDate(), 'start', 'month'),
                            __endDate: service.getDate(moment(data).toDate(), 'end', 'month'),
                        }
                        break
                    }
                    case E_FILTER_DATE.YEAR: {
                        params = {
                            __startDate: service.getDate(moment(data).toDate(), 'start', 'year'),
                            __endDate: service.getDate(moment(data).toDate(), 'end', 'year'),
                        }
                        break
                    }
                }
            }

            return {
                ...getAll,
                query,
                params: { ...getAll.params, ...params, receiveCostKindIds },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    },
    filterSubmit(data, { defaultValues, getAll, receiveCostKindIds }) {
        switch (data.id) {
            case E_FILTER_DATE.ALL:
                return getAll
            case E_FILTER_DATE.DATE_RANGE:
                const [startDate, endDate] = data.data as Date[]
                return (prev) => ({
                    ...prev,
                    query: services.filterQuery,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(startDate, 'start'),
                        __endDate: service.getDate(endDate, 'end'),
                        receiveCostKindIds,
                    },
                })
            case E_FILTER_DATE.MONTH:
                const month = data.data as Date
                return (prev) => ({
                    ...prev,
                    query: services.filterQuery,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(month, 'start', 'month'),
                        __endDate: service.getDate(month, 'end', 'month'),
                        receiveCostKindIds,
                    },
                })
            case E_FILTER_DATE.YEAR:
                const year = data.data as Date
                return (prev) => ({
                    ...prev,
                    query: services.filterQuery,
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(year, 'start', 'year'),
                        __endDate: service.getDate(year, 'end', 'year'),
                        receiveCostKindIds,
                    },
                })
        }
    },
}
