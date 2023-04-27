import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ICalendarDetail } from '~/@types/time'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_DETAIL_SCHEDULE } from '~/schema/query/time'
import { useProfile } from '~/store/auth'

export const useTranslateLabel = (label: string) => {
    const { t } = useTranslation()

    const getLabel = useMemo(() => {
        switch (label) {
            case 'Sun':
                return t(LANGUAGE.CALENDAR_SHORT_SUNDAY)
            case 'Mon':
                return t(LANGUAGE.CALENDAR_SHORT_MONDAY)
            case 'Tue':
                return t(LANGUAGE.CALENDAR_SHORT_TUESDAY)
            case 'Wed':
                return t(LANGUAGE.CALENDAR_SHORT_WEDNESDAY)
            case 'Thu':
                return t(LANGUAGE.CALENDAR_SHORT_THURSDAY)
            case 'Fri':
                return t(LANGUAGE.CALENDAR_SHORT_FRIDAY)
            case 'Sat':
                return t(LANGUAGE.CALENDAR_SHORT_SATURDAY)
            default:
                return label
        }
    }, [t])

    return getLabel
}

interface CalendarDetailQueryData {
    calendar: ICalendarDetail
}

export const useCalendarDetail = (id: string | undefined) => {
    if (!id) {
        throw new Error('id is required')
    }

    const { userProfile } = useProfile()

    const [{ calendar }, fetchData, deletedCaches, reloadData] = useQuery<CalendarDetailQueryData>(
        { calendar: GET_DETAIL_SCHEDULE },
        { id, userId: userProfile?._id as string },
        { calendar: TAGS.SHORT }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const clearCache = () => {
        deletedCaches('calendar')
    }

    return { calendar, clearCache, reload: reloadData }
}
