import { isEmpty, isEqual } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { ICalendar } from '~/@types/time'
import { DATE_FORMAT, TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_SCHEDULE } from '~/schema/query/time'
import { useProfile } from '~/store/auth'

interface CalendarQueryData {
    calendar: {
        data: ICalendar[]
    }
}
interface QueryState {
    query: QueryTypeUseQuery<CalendarQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<CalendarQueryData>
    needRefetch: boolean
}

const getStartDate = (date?: moment.MomentInput) => {
    return moment(date).startOf('month').isoWeekday(1).toISOString()
}

const getEndDate = (date?: moment.MomentInput) => {
    return moment(date).endOf('month').isoWeekday(7).toISOString()
}

const useCalendar = () => {
    const { userProfile } = useProfile()
    const [searchParams] = useSearchParams()
    const ref = useRef<ICalendar[]>([])
    const excludes = useRef<string[]>([])
    const calledMonths = useRef<string[]>([])

    const { query, params, tags, needRefetch } = useMemo<QueryState>(() => {
        const query = { calendar: GET_SCHEDULE }
        const params = {
            __startDate: getStartDate(),
            __endDate: getEndDate(),
            userId: userProfile?._id as string,
        }
        const tags = { calendar: TAGS.ALTERNATE }

        try {
            let result = { query, params, tags, needRefetch: true }
            const month = searchParams.get('month')
            if (month) {
                const monthValue = moment(JSON.parse(month), DATE_FORMAT.MONTH)
                const monthValueFormatted = monthValue.format(DATE_FORMAT.MONTH)

                result.params = {
                    ...result.params,
                    __startDate: getStartDate(monthValue),
                    __endDate: getEndDate(monthValue),
                }

                if (calledMonths.current.includes(monthValueFormatted)) {
                    result.needRefetch = false
                    return result
                }

                calledMonths.current.push(monthValueFormatted)
            } else {
                const month = moment().format(DATE_FORMAT.MONTH)
                if (calledMonths.current.includes(month)) {
                    result.needRefetch = false
                    return result
                }
                calledMonths.current.push(month)
            }

            const _ref = ref.current
            excludes.current = []

            if (!isEmpty(_ref)) {
                // get exclude schedule ids
                excludes.current = _ref
                    .filter((item) => {
                        const itemStartDate = moment(item.startDate)
                        const itemEndDate = moment(item.endDate)
                        const paramStartDate = moment(result.params.__startDate)
                        const paramEndDate = moment(result.params.__endDate)

                        return (
                            (itemEndDate.isAfter(paramStartDate) && itemEndDate.isBefore(paramEndDate)) ||
                            (itemStartDate.isBefore(paramEndDate) && itemStartDate.isAfter(paramStartDate)) ||
                            (itemStartDate.isBefore(paramStartDate) && itemEndDate.isAfter(paramEndDate))
                        )
                    })
                    .map((item) => item._id)
            }
            return result
        } catch (error) {
            console.log(error)
            return { query, params, tags, needRefetch: false }
        }
    }, [searchParams])

    const [{ calendar }, fetchData, deletedCaches, reloadData] = useQuery<CalendarQueryData>(
        query,
        { ...params, __excludeIds: excludes.current },
        tags
    )

    useEffect(() => {
        const data = calendar.data?.data
        if (data && !isEqual(data, ref.current)) {
            ref.current = data
        }
    }, [JSON.stringify(calendar.data?.data)])

    const refetch = () => {
        deletedCaches('calendar')
        excludes.current = []
        calledMonths.current = []
        reloadData()
    }

    useEffect(() => {
        if (needRefetch) {
            reloadData('calendar')
        }
    }, [needRefetch, params])

    return {
        calendar,
        refetch,
    }
}

export default useCalendar
