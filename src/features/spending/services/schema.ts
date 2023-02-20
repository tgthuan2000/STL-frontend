import * as yup from 'yup'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n
export const budgetSchema = yup.object().shape({
    date: yup
        .date()
        .typeError(t(LANGUAGE.REQUIRED_DATE) as any)
        .required(t(LANGUAGE.REQUIRED_DATE) as any),
    MethodSpending: yup.array().of(
        yup.object().shape({
            _id: yup.string().nullable(),
            amount: yup
                .number()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_FIELD) as any)
                .typeError(t(LANGUAGE.REQUIRED_TYPE_NUMBER) as any)
                .moreThan(0, t(LANGUAGE.SURPLUS_MIN_ZERO) as any),
            methodSpending: yup
                .object()
                .shape({
                    _id: yup.string().required(),
                    name: yup.string().required(),
                })
                .nullable()
                .required(t(LANGUAGE.REQUIRED_METHOD)),
        })
    ),
    CategorySpending: yup.array().of(
        yup.object().shape({
            _id: yup.string().nullable(),
            amount: yup
                .number()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_FIELD) as any)
                .typeError(t(LANGUAGE.REQUIRED_TYPE_NUMBER) as any)
                .moreThan(0, t(LANGUAGE.SURPLUS_MIN_ZERO) as any),
            categorySpending: yup
                .object()
                .shape({
                    _id: yup.string().required(),
                    name: yup.string().required(),
                })
                .nullable()
                .required(t(LANGUAGE.REQUIRED_CATEGORY)),
        })
    ),
})
