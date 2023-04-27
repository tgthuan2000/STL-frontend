import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Data } from '~/@types/hook'
import { ICalendar } from '~/@types/time'
import { DATE_FORMAT, TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_SCHEDULE } from '~/schema/query/time'
import { useProfile } from '~/store/auth'

interface CalendarQueryData {
    calendar: ICalendar[]
}

const useCalendar = () => {
    const { userProfile } = useProfile()
    const { month } = useParams()
    // const date = moment(month, DATE_FORMAT.MONTH)
    const date = moment()
    const [{ calendar }, fetchData, deletedCaches, reloadData] = useQuery<CalendarQueryData>(
        { calendar: GET_SCHEDULE },
        {
            startDate: date.startOf('month').toISOString(),
            endDate: date.endOf('month').toISOString(),
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
