import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import LANGUAGE from '~/i18n/language/key'

export const useChangePasswordSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            'old-password': yup
                .string()
                .nullable()
                .when('__isHasPassword', {
                    is: true,
                    then: yup.string().required(t(LANGUAGE.REQUIRED_OLD_PASSWORD) as string),
                }),
            'new-password': yup
                .string()
                .required(t(LANGUAGE.REQUIRED_NEW_PASSWORD) as string)
                .min(1, t(LANGUAGE.NEW_PASSWORD_MIN_1) as string),
            're-password': yup
                .string()
                .required(t(LANGUAGE.REQUIRED_RE_PASSWORD) as string)
                .oneOf([yup.ref('new-password')], t(LANGUAGE.PASSWORD_NOT_MATCH) as string),
        })
    }, [t])
    return schema
}
