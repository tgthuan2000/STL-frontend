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
    const month = searchParams.get('month')

    const { query, params, tags, needRefetch } = useMemo<QueryState>(() => {
        const query = { calendar: GET_SCHEDULE }
        const params: ParamsTypeUseQuery = {
            userId: userProfile?._id as string,
        }
        const tags = { calendar: TAGS.ALTERNATE }

        try {
            let result = { query, params, tags, needRefetch: true }
            const _month = moment(month ? moment(JSON.parse(month), DATE_FORMAT.MONTH) : undefined)

            result.params = {
                ...result.params,
                __startDate: getStartDate(_month),
                __endDate: getEndDate(_month),
            }

            if (calledMonths.current.includes(_month.format(DATE_FORMAT.MONTH))) {
                result.needRefetch = false
                return result
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
    }, [month])

    const [{ calendar }, fetchData, deletedCaches, reloadData] = useQuery<CalendarQueryData>(
        query,
        { ...params, __excludeIds: excludes.current },
        tags
    )

    useEffect(() => {
        const data = calendar.data?.data
        if (data && !isEqual(data, ref.current)) {
            ref.current = data

            const _month = moment(month ? moment(JSON.parse(month), DATE_FORMAT.MONTH) : undefined).format(
                DATE_FORMAT.MONTH
            )

            if (!calledMonths.current.includes(_month)) {
                calledMonths.current.push(_month)
            }
        }
    }, [JSON.stringify(calendar.data?.data), month])

    const refetch = () => {
        deletedCaches('calendar')
        excludes.current = []
        calledMonths.current = []
        reloadData()
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if (needRefetch) {
            timeout = setTimeout(() => {
                reloadData('calendar')
            }, 500)
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [needRefetch, params])

    return {
        calendar,
        refetch,
    }
}

export default useCalendar
