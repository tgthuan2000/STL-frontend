import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { CreateStep1Props } from '~/@types/announce-config'
import { DraftNotify, NotifyContentForm } from '~/@types/notify'
import { RichText } from '~/components/_base'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            content: yup.string().required(t(LANGUAGE.REQUIRED_NOTIFY_CONTENT) as string),
        })
    }, [t])
    return schema
}

const Step1: React.FC<CreateStep1Props> = ({ id, onSubmit }) => {
    const { t } = useTranslation()
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const schema = useSchema()
    const form = useForm<NotifyContentForm>({
        defaultValues: {
            content: draftNotify?.content ?? '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit = async (data: NotifyContentForm) => {
        onSubmit(data)
    }
    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
            <div className='mt-3 mb-5'>
                <RichText
                    form={form}
                    name='content'
                    label={t(LANGUAGE.CONTENT)}
                    placeholder={t(LANGUAGE.PLACEHOLDER_ENTER_CONTENT)}
                    className='xl'
                />
            </div>
        </form>
    )
}

export default Step1
