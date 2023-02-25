import { isEmpty } from 'lodash'
import moment from 'moment'
import { Services } from '~/@types/announce-config'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { E_FILTER_DATE } from '~/constant/template'
import { GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE, GET_NOTIFY_CONFIG_PAGINATE } from '~/schema/query/notify'
import { service } from '~/services'

export const services: Services = {
    getAll: {
        query: { notify: GET_NOTIFY_CONFIG_PAGINATE },
        params: {
            __fromNotify: 0,
            __toNotify: COUNT_PAGINATE,
        },
        tags: { notify: TAGS.ALTERNATE },
    },
    getDefaultValue({ searchParams }) {
        const getAll = services.getAll
        try {
            let query = GET_NOTIFY_CONFIG_PAGINATE,
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE
                let { type, data } = d
                data = JSON.parse(data)

                switch (Number(type)) {
                    case E_FILTER_DATE.DATE: {
                        params = {
                            __startDate: service.getDate(moment(data).toDate(), 'start'),
                            __endDate: service.getDate(moment(data).toDate(), 'end'),
                        }
                        break
                    }
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
                query: { notify: query },
                params: { ...getAll.params, ...params },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    },
    filterSubmit(data, { defaultValues }) {
        switch (data.id) {
            case E_FILTER_DATE.ALL:
                return services.getAll

            case E_FILTER_DATE.DATE:
                const date = data.data as Date
                return (prev) => ({
                    ...prev,
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
                    params: {
                        ...defaultValues.params,
                        __startDate: service.getDate(year, 'start', 'year'),
                        __endDate: service.getDate(year, 'end', 'year'),
                    },
                })
        }
    },
}
