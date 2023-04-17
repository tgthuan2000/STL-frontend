import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProgressItem } from '~/@types/components'
import LANGUAGE from '~/i18n/language/key'

export const useCreateProgressOptions = (): Array<ProgressItem> => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
            { step: 1, label: t(LANGUAGE.PROGRESS_CONTENT) },
            { step: 2, label: t(LANGUAGE.PROGRESS_TITLE_DESC) },
            { step: 3, label: t(LANGUAGE.PROGRESS_CHOOSE_MEMBER) },
            { step: 4, label: t(LANGUAGE.PROGRESS_PREVIEW_AND_SEND) },
        ]
    }, [t])
    return data
}
