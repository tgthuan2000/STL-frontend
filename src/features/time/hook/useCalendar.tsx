import moment from 'moment'
import React, { useEffect } from 'react'
import { ICalendar } from '~/@types/time'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_SCHEDULE } from '~/schema/query/time'
import { useProfile } from '~/store/auth'

interface CalendarQueryData {
    calendar: ICalendar[]
}

const useCalendar = () => {
    const { userProfile } = useProfile()
    const [{ calendar }, fetchData] = useQuery<CalendarQueryData>(
        { calendar: GET_SCHEDULE },
        {
            fromDate: moment().startOf('month').toISOString(),
            toDate: moment().endOf('month').toISOString(),
            userId: userProfile?._id as string,
        },
        { calendar: TAGS.ALTERNATE }
    )

    useEffect(() => {
        fetchData()
    }, [])

    return calendar
}

export default useCalendar
