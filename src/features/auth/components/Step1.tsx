import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { Step1Props } from '~/@types/auth'
import { Button } from '~/components'
import { Input } from '~/components/_base'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup
                .string()
                .email(t(LANGUAGE.INVALID_FORMAT) as string)
                .required(t(LANGUAGE.REQUIRED_FIELD) as string),
        })
    }, [t])
    return schema
}

const Step1: React.FC<Step1Props> = ({ onSubmit }) => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const schema = useSchema()
    const form = useForm<{ email: string }>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-3'>
                <Input
                    name='email'
                    form={form}
                    label={t(LANGUAGE.ACCOUNT_OPTION_EMAIL)}
                    disabled={loading.submit}
                    autoFocus
                />
                <Button className='!text-xs' color='cyan' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.NEXT)}
                </Button>
            </div>
        </form>
    )
}

export default Step1
