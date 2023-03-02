import { isEmpty } from 'lodash'
import { AccountService } from '~/@types/account'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { GET_ACCOUNTS } from '~/schema/query/account'

export const services: AccountService = {
    getAll() {
        return {
            query: {
                account: GET_ACCOUNTS,
            },
            params: {
                __fromAccount: 0,
                __toAccount: COUNT_PAGINATE,
            },
            tags: {
                account: TAGS.ALTERNATE,
            },
        }
    },
    getDefaultValue({ getAll, searchParams }) {
        try {
            let query = {
                    account: GET_ACCOUNTS,
                },
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = {
                    account: '',
                }
                let { type, data } = d
                data = JSON.parse(data)

                // switch (Number(type)) {
                //     case E_FILTER_DATE.DATE: {
                //         params = {
                //             __startDate: service.getDate(moment(data).toDate(), 'start'),
                //             __endDate: service.getDate(moment(data).toDate(), 'end'),
                //         }
                //         break
                //     }
                //     case E_FILTER_DATE.DATE_RANGE: {
                //         const [startDate, endDate] = data
                //         params = {
                //             __startDate: service.getDate(moment(startDate).toDate(), 'start'),
                //             __endDate: service.getDate(moment(endDate).toDate(), 'end'),
                //         }
                //         break
                //     }
                //     case E_FILTER_DATE.MONTH: {
                //         params = {
                //             __startDate: service.getDate(moment(data).toDate(), 'start', 'month'),
                //             __endDate: service.getDate(moment(data).toDate(), 'end', 'month'),
                //         }
                //         break
                //     }
                //     case E_FILTER_DATE.YEAR: {
                //         params = {
                //             __startDate: service.getDate(moment(data).toDate(), 'start', 'year'),
                //             __endDate: service.getDate(moment(data).toDate(), 'end', 'year'),
                //         }
                //         break
                //     }
                // }
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
}
