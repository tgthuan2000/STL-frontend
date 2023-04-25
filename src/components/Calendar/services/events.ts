import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

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
