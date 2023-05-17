import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const useCalendarTranslate = () => {
    const { t } = useTranslation()

    const weekday: { [x: string]: string } = useMemo(
        () => ({
            Mo: t(LANGUAGE.MO),
            Tu: t(LANGUAGE.TU),
            We: t(LANGUAGE.WE),
            Th: t(LANGUAGE.TH),
            Fr: t(LANGUAGE.FR),
            Sa: t(LANGUAGE.SA),
            Su: t(LANGUAGE.SU),
        }),
        [t]
    )

    return { weekday }
}

export default useCalendarTranslate
