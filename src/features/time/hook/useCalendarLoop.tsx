import { isEmpty, isUndefined } from 'lodash'
import { useEffect } from 'react'
import { Loop } from '~/@types/time'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_SCHEDULE_LOOPS } from '~/schema/query/time'

interface CalendarLoopQueryData {
    loops: Loop[]
}

const useCalendarLoop = (callback: (data: Loop[]) => void) => {
    const [{ loops }, fetchData] = useQuery<CalendarLoopQueryData>(
        { loops: GET_SCHEDULE_LOOPS },
        {},
        { loops: TAGS.ENUM }
    )

    useEffect(() => {
        if (isUndefined(loops.data)) {
            fetchData()
        }
    }, [loops.data])

    useEffect(() => {
        if (!isEmpty(loops.data) && !isUndefined(loops.data)) {
            callback(loops.data)
        }
    }, [loops.data])

    return loops
}

export default useCalendarLoop
