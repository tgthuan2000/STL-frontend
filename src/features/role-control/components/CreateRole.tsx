import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, FormWrap, SubmitWrap } from '~/components'
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
    const { close } = useSlideOver()
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
        <FormWrap
            onSubmit={form.handleSubmit(onSubmit)}
            renderButton={
                <SubmitWrap>
                    <Button color='rose' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.CREATE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
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
        </FormWrap>
    )
}

export default CreateRole
