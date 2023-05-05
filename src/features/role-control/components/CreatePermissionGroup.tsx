import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, SubmitWrap } from '~/components'
import { Input } from '~/components/_base'
import { useCheck, useLoading, useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            _id: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
            name: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
        })
    }, [t])

    return schema
}

interface Form {
    _id: string
    name: string
}

const CreatePermissionGroup = () => {
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { needCheckWhenLeave } = useCheck()
    const schema = useSchema()
    const form = useForm<Form>({
        defaultValues: {
            _id: '',
            name: '',
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: Form) => {
        console.log(data)
        try {
            setSubmitLoading(true)

            let { _id, name } = data
            name = name.trim()
            _id = _id.trim().replaceAll(' ', '_').toUpperCase()

            if (!_id.startsWith('GROUP_')) {
                return
            }

            await client.createIfNotExists({ _type: 'permissionGroup', _id, name })

            needCheckWhenLeave()
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_SUCCESS))
        } catch (error) {
            console.log(error)
            toast.error<string>(t(LANGUAGE.NOTIFY_ERROR))
        } finally {
            setSubmitLoading(false)
        }
    }

    const name = form.watch('name')

    useEffect(() => {
        form.setValue('_id', 'GROUP_' + name.trim().replaceAll(' ', '_').toUpperCase())
    }, [name])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
                            <Input name='_id' form={form} type='text' label='ID' disabled />

                            <Input name='name' form={form} type='text' label={t(LANGUAGE.NAME)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='indigo' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.CREATE)}
                </Button>
                <Button
                    color='outline'
                    type='button'
                    onClick={() => {
                        setIsOpen(false)
                        navigate(-1)
                    }}
                >
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default CreatePermissionGroup
