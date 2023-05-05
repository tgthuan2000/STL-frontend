import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button } from '~/components'
import { Input, TextArea } from '~/components/_base'
import { useCheck, useDetailDialog, useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'

interface ContentProps {
    groupId: string
}

interface CreatePermissionForm {
    _id: string
    name: string
    description?: string
}

const Content: React.FC<ContentProps> = (props) => {
    const { groupId } = props
    const { t } = useTranslation()
    const { close } = useDetailDialog()
    const { setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()

    const form = useForm<CreatePermissionForm>({
        defaultValues: {
            _id: '',
            name: '',
            description: '',
        },
        resolver: yupResolver(
            yup.object().shape({
                _id: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
                name: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
                description: yup.string(),
            })
        ),
    })

    const onSubmit = async (data: CreatePermissionForm) => {
        try {
            setSubmitLoading(true)
            let { _id, name, description } = data
            name = data.name.trim()
            description = data.description?.trim()
            _id = name.trim().replaceAll(' ', '_').toUpperCase()

            await client.createIfNotExists({
                _type: 'permission',
                _id,
                name,
                description,
                group: {
                    _type: 'reference',
                    _ref: groupId,
                },
            })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_SUCCESS))
            needCheckWhenLeave()
            close()
        } catch (error: any) {
            console.log(error)
            toast.error<string>(error.message)
        } finally {
            setSubmitLoading(false)
        }
    }

    const name = form.watch('name')

    useEffect(() => {
        form.setValue('_id', name.trim().replaceAll(' ', '_').toUpperCase())
    }, [name])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col gap-2'>
            <div className='flex flex-1 flex-col gap-4 px-6 pb-6 pt-4'>
                <Input form={form} type='text' name='_id' label='ID' disabled />

                <Input form={form} type='text' name='name' label={t(LANGUAGE.NAME)} />

                <TextArea form={form} name='description' label={t(LANGUAGE.SHORT_DESCRIPTION)} />
            </div>
            <div className='flex justify-end gap-2 px-6 pb-6 pt-4'>
                <Button type='button' color='outline' onClick={() => close()}>
                    {t(LANGUAGE.CLOSE)}
                </Button>
                <Button type='submit' color='indigo'>
                    {t(LANGUAGE.CREATE)}
                </Button>
            </div>
        </form>
    )
}

export default Content
