import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Id, toast } from 'react-toastify'
import { CODE } from '~/constant/code'
import LANGUAGE from '~/i18n/language/key'

export const useAxiosService = () => {
    const { t } = useTranslation()

    const codes: { [key in CODE]: () => boolean | Id | void } = useMemo(() => {
        return {
            /* COMMON */
            [CODE.SUCCESS]: () => true,

            [CODE.FORBIDDEN]: () => toast.error(t(LANGUAGE.NOTIFY_FORBIDDEN)),
            /* REQUIRED */
            [CODE.REQUIRED_EMAIL]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_EMAIL)),
            [CODE.REQUIRED_ID]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_ID)),
            [CODE.REQUIRED_PASSWORD]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_PASSWORD)),
            [CODE.REQUIRED_CREDENTIAL]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_CREDENTIAL)),
            [CODE.REQUIRED_REFRESH_TOKEN]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_REFRESH_TOKEN)),
            [CODE.REQUIRED_DATA]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_DATA)),
            [CODE.REQUIRED_URL]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_URL)),
            [CODE.REQUIRED_SUBSCRIPTION_ID]: () => toast.error(t(LANGUAGE.NOTIFY_REQUIRED_SUBSCRIPTION_ID)),

            /* INVALID */
            [CODE.INVALID_OLD_PASSWORD]: () => toast.error(t(LANGUAGE.NOTIFY_INVALID_OLD_PASSWORD)),
            [CODE.INVALID_PASSWORD]: () => toast.error(t(LANGUAGE.NOTIFY_INVALID_PASSWORD)),
            [CODE.INVALID_DATA]: () => toast.error(t(LANGUAGE.NOTIFY_INVALID_DATA)),

            /* TOKEN */
            [CODE.ACCESS_TOKEN_EXPIRED]: () => {},
            [CODE.REFRESH_TOKEN_EXPIRED]: () => toast.warn(t(LANGUAGE.NOTIFY_REFRESH_TOKEN_EXPIRED)),
            [CODE.CHECK_2FA]: () => true,
            [CODE.TWO_FA_INVALID]: () => toast.error(t(LANGUAGE.NOTIFY_TWO_FA_CODE_INVALID)),
            [CODE.TOKEN_REVOKED]: () => toast.error(t(LANGUAGE.NOTIFY_TOKEN_REVOKED)),
        }
    }, [t])

    const notify = useCallback((code: CODE) => codes[code]?.(), [codes])

    return { notify }
}
