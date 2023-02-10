import { ProgressItem } from '~/@types/components'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

export const createProgressOptions: Array<ProgressItem> = [
    { step: 1, label: t(LANGUAGE.PROGRESS_CONTENT) },
    { step: 2, label: t(LANGUAGE.PROGRESS_TITLE_DESC) },
    { step: 3, label: t(LANGUAGE.PROGRESS_CHOOSE_MEMBER) },
    { step: 4, label: t(LANGUAGE.PROGRESS_PREVIEW_AND_SEND) },
]
