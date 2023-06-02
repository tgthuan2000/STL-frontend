import { lazy, useCallback, useMemo } from 'react'
import { Components, Messages } from 'react-big-calendar'
import { useTranslation } from 'react-i18next'
import LoadingText from '~/components/Loading/LoadingText'
import { useDetailDialog } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { CalendarEvent } from '..'
import { DateHeader, EventWrapper, Header, Toolbar } from '../components'
import EventListShowMoreTitle from '../components/EventListShowMoreTitle'

const EventListShowMoreContent = lazy(() => import('../components/EventListShowMoreContent'))

export const useMessage = (): Messages => {
    const { t } = useTranslation()

    const messages: Messages = useMemo(() => {
        return {
            previous: t(LANGUAGE.CALENDAR_PREVIOUS) as string,
            next: t(LANGUAGE.CALENDAR_NEXT) as string,
            today: t(LANGUAGE.CALENDAR_TODAY) as string,
            tomorrow: t(LANGUAGE.CALENDAR_TOMORROW) as string,
            yesterday: t(LANGUAGE.CALENDAR_YESTERDAY) as string,
            month: t(LANGUAGE.CALENDAR_MONTH) as string,
            week: t(LANGUAGE.CALENDAR_WEEK) as string,
            day: t(LANGUAGE.CALENDAR_DAY) as string,
            agenda: t(LANGUAGE.CALENDAR_AGENDA) as string,
            date: t(LANGUAGE.CALENDAR_DATE) as string,
            time: t(LANGUAGE.CALENDAR_TIME) as string,
            event: t(LANGUAGE.CALENDAR_EVENT) as string,
            noEventsInRange: t(LANGUAGE.CALENDAR_NO_EVENTS_IN_RANGE) as string,
            showMore: (total: number) => `+${total} ${t(LANGUAGE.CALENDAR_L_EVENTS)}`,
            work_week: t(LANGUAGE.CALENDAR_WORK_WEEK) as string,
            allDay: t(LANGUAGE.CALENDAR_ALL_DAY) as string,
        }
    }, [t])
    return messages
}

export const useLabel = (label: string) => {
    const { t } = useTranslation()

    const translatedLabel = useMemo(() => {
        switch (label) {
            case 'January':
                return t(LANGUAGE.CALENDAR_JANUARY)
            case 'February':
                return t(LANGUAGE.CALENDAR_FEBRUARY)
            case 'March':
                return t(LANGUAGE.CALENDAR_MARCH)
            case 'April':
                return t(LANGUAGE.CALENDAR_APRIL)
            case 'May':
                return t(LANGUAGE.CALENDAR_MAY)
            case 'June':
                return t(LANGUAGE.CALENDAR_JUNE)
            case 'July':
                return t(LANGUAGE.CALENDAR_JULY)
            case 'August':
                return t(LANGUAGE.CALENDAR_AUGUST)
            case 'September':
                return t(LANGUAGE.CALENDAR_SEPTEMBER)
            case 'October':
                return t(LANGUAGE.CALENDAR_OCTOBER)
            case 'November':
                return t(LANGUAGE.CALENDAR_NOVEMBER)
            case 'December':
                return t(LANGUAGE.CALENDAR_DECEMBER)
        }
    }, [t, label])

    return translatedLabel as string
}

export const useComponents = () => {
    const { set } = useDetailDialog()

    const components = useMemo(() => {
        const comps: Components<CalendarEvent> = {
            toolbar: Toolbar,
            month: {
                header: Header,
                dateHeader: DateHeader,
            },
            eventWrapper: EventWrapper as any,
        }
        return comps
    }, [])

    const onShowMore = useCallback((events: CalendarEvent[], date: Date) => {
        set({
            title: <EventListShowMoreTitle current={date} />,
            content: <EventListShowMoreContent data={events} current={date} />,
            fallback: <LoadingText className='px-6 py-3' />,
        })
    }, [])

    return { components, onShowMore }
}
