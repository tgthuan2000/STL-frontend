import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input, InputCode } from '~/components/_base'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n
const schema = yup.object().shape({
    value: yup
        .number()
        .test('length', t(LANGUAGE.TWO_FACTOR_AUTHENTICATION_ERROR) as string, (val) => {
            if (!val) return false
            return val.toString().length === 6
        })
        .required(t(LANGUAGE.REQUIRED_FIELD) as string)
        .typeError(t(LANGUAGE.REQUIRED_FIELD) as string),
})

interface TwoFactorFormProps {
    id?: string
    onSubmit: (data: { value: string }) => void
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({ id, onSubmit }) => {
    const form = useForm({
        defaultValues: {
            value: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (data: { value: string }) => {
        console.log(data)
        onSubmit(data)
    }

    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)}>
            <InputCode form={form} name='value' label={t(LANGUAGE.ENTER_CODE_APPLICATION)} />
        </form>
    )
}

export default TwoFactorForm
