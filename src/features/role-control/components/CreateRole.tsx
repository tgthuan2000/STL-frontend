import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, Input, TextArea } from '~/components/_base'
import { useCheck, useLoading, useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import useRole from '../hook/useRole'

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
    description?: string
    parent?: any
}

const CreateRole = () => {
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
            description: '',
            parent: null,
        },
        resolver: yupResolver(schema),
    })

    const { roles, refetch } = useRole()

    const onSubmit = async (data: Form) => {
        console.log(data)
        try {
            setSubmitLoading(true)

            let { _id, name, description, parent } = data
            name = name.trim()
            _id = _id.trim().replaceAll(' ', '_').toUpperCase()
            description = description?.trim()

            await client.createIfNotExists({
                _type: 'role',
                _id,
                name,
                description,
                permissions: [],
                ...(parent && {
                    parent: { _ref: parent._id, _type: 'reference' },
                }),
            })

            needCheckWhenLeave()
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_SUCCESS))
        } catch (error) {
            console.log(error)
            toast.error<string>(t(LANGUAGE.NOTIFY_ERROR))
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
                            <Input name='_id' form={form} type='text' label='ID' />

                            <Input name='name' form={form} type='text' label={t(LANGUAGE.NAME)} />

                            <TextArea name='description' form={form} label={t(LANGUAGE.SHORT_DESCRIPTION)} />

                            <AutoComplete
                                name='parent'
                                form={form}
                                data={roles.data}
                                loading={roles.loading}
                                onReload={refetch}
                                label={t(LANGUAGE.PARENT_ROLE)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='rose' type='submit' disabled={loading.submit}>
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

export default CreateRole
