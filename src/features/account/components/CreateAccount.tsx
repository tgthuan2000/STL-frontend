import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { IRoleControl } from '~/@types/role-control'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, Input, Toggle } from '~/components/_base'
import { useCheck, useLoading, useSlideOver } from '~/context'
import useRole from '~/features/role-control/hook/useRole'
import { useAxios } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            userName: yup
                .string()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string)
                .min(4, t(LANGUAGE.MIN_LENGTH_4) as string)
                .trim(),
            password: yup
                .string()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string)
                .min(4, t(LANGUAGE.MIN_LENGTH_4) as string),
            rePassword: yup
                .string()
                .required(t(LANGUAGE.REQUIRED_RE_PASSWORD) as string)
                .min(4, t(LANGUAGE.MIN_LENGTH_4) as string)
                .oneOf([yup.ref('password'), null], t(LANGUAGE.PASSWORD_NOT_MATCH) as string),
            email: yup
                .string()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string)
                .email(t(LANGUAGE.INVALID_FORMAT) as string),
            role: yup
                .object()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string)
                .nullable(),
        })
    }, [t])

    return schema
}

interface Form {
    userName: string
    password: string
    rePassword: string
    email: string
    role: IRoleControl | null
    active: boolean
}

const CreateAccount = () => {
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { close } = useSlideOver()
    const { needCheckWhenLeave } = useCheck()
    const { roles, refetch } = useRole()
    const schema = useSchema()
    const axios = useAxios()
    const form = useForm<Form>({
        defaultValues: {
            userName: '',
            password: '',
            rePassword: '',
            email: '',
            role: null,
            active: false,
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: Form) => {
        try {
            setSubmitLoading(true)

            let { active, email, password, userName, role } = data

            if (!role) {
                toast.error<string>(t(LANGUAGE.ERROR))
                return
            }

            await axios.post('/auth/register', { active, email, password, userName, role: role._id })

            needCheckWhenLeave()
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_SUCCESS))
        } catch (error) {
            console.log(error)
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
                            <Input name='email' form={form} type='text' label={t(LANGUAGE.EMAIL)} />

                            <Input name='password' form={form} type='password' label={t(LANGUAGE.PASSWORD)} />

                            <Input name='rePassword' form={form} type='password' label={t(LANGUAGE.RE_PASSWORD)} />

                            <Input name='userName' form={form} type='text' label={t(LANGUAGE.NAME)} />

                            <AutoComplete
                                name='role'
                                form={form}
                                label={t(LANGUAGE.ROLE)}
                                loading={roles.loading}
                                data={roles.data}
                                onReload={refetch}
                            />

                            <Toggle name='active' form={form} label={t(LANGUAGE.ACTIVE)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='green' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.CREATE)}
                </Button>
                <Button color='outline' type='button' onClick={close}>
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default CreateAccount
