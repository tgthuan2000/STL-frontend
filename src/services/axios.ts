import { Id, toast } from 'react-toastify'
import { CODE } from '~/constant/code'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

export const handleDataStatus = (code: CODE) => {
    const codes: { [key in CODE]: () => boolean | Id } = {
        /* COMMON */
        [CODE.SUCCESS]: () => true,
        [CODE.FORBIDDEN]: () => {
            return toast.error(t(LANGUAGE.NOTIFY_FORBIDDEN))
        },

        /* REQUIRED */
        [CODE.REQUIRED_EMAIL]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_EMAIL)),
        [CODE.REQUIRED_ID]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_ID)),
        [CODE.REQUIRED_PASSWORD]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_PASSWORD)),

        /* INVALID */
        [CODE.INVALID_OLD_PASSWORD]: () => toast.error(t(LANGUAGE.NOTIFY_INVALID_OLD_PASSWORD)),
        [CODE.INVALID_PASSWORD]: () => toast.error(t(LANGUAGE.NOTIFY_INVALID_PASSWORD)),
    }

    return codes[code]?.()
}