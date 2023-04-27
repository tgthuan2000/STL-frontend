import moment from 'moment'
import React, { useEffect } from 'react'
import { Data } from '~/@types/hook'
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
    const [{ calendar }, fetchData, deletedCaches, reloadData] = useQuery<CalendarQueryData>(
        { calendar: GET_SCHEDULE },
        {
            fromDate: moment().startOf('month').toISOString(),
            toDate: moment().endOf('month').toISOString(),
            userId: userProfile?._id as string,
        },
        { calendar: TAGS.ALTERNATE }
    )

    const refetch = () => {
        deletedCaches('calendar')
        reloadData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        calendar,
        refetch,
    }
}

export default useCalendar
