import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, FormWrap, SubmitWrap, Transaction } from '~/components'
import { Input } from '~/components/_base'
import { useLoading } from '~/context'
import { useAxios, useLogout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import { useChangePasswordSchema } from '../hook/schema'

interface Form {
    'old-password': string
    'new-password': string
    're-password': string
}

const ChangePassword = () => {
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { userProfile } = useProfile()
    const navigate = useNavigate()
    const logout = useLogout()
    const changePasswordSchema = useChangePasswordSchema()
    const axios = useAxios()

    const isHasPassword = get(userProfile, 'isHasPassword', false)

    const form = useForm<Form & { __isHasPassword: boolean }>({
        mode: 'onBlur',
        defaultValues: {
            'old-password': '',
            'new-password': '',
            're-password': '',
            __isHasPassword: isHasPassword,
        },
        resolver: yupResolver(changePasswordSchema),
    })

    const onSubmit: SubmitHandler<Form> = async (data) => {
        try {
            setSubmitLoading(true)
            const { 'new-password': newPassword, 'old-password': oldPassword } = data

            if (isHasPassword) {
                await axios.post('/auth/change-password', { oldPassword, newPassword })
            } else {
                await axios.post('/auth/set-password', { password: newPassword })
            }
            toast.success(t(LANGUAGE.NOTIFY_UPDATE_PASSWORD_SUCCESS))
            await logout()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Transaction title={t(LANGUAGE.CHANGE_PASSWORD)}>
            <div className='rounded-xl bg-white py-2 shadow-lg dark:bg-slate-800 sm:py-6 lg:py-8'>
                <div className='mx-auto w-full max-w-lg'>
                    <FormWrap
                        onSubmit={form.handleSubmit(onSubmit)}
                        renderButton={
                            <SubmitWrap>
                                <Button color='blue' type='submit' disabled={loading.submit}>
                                    {t(LANGUAGE.UPDATE)}
                                </Button>
                                <Button
                                    color='outline'
                                    type='button'
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
                                    {t(LANGUAGE.CANCEL)}
                                </Button>
                            </SubmitWrap>
                        }
                    >
                        {userProfile && !isHasPassword && (
                            <div className='mx-2 flex select-none items-center gap-2 rounded-md bg-yellow-500 p-3 text-white'>
                                <ExclamationTriangleIcon className='h-6' />
                                <p className='font-normal'>{t(LANGUAGE.ACCOUNT_NOT_HAVE_PASSWORD)}</p>
                            </div>
                        )}

                        {isHasPassword && (
                            <Input
                                name='old-password'
                                form={form}
                                type='password'
                                label={t(LANGUAGE.OLD_PASSWORD)}
                                disabled={loading.submit}
                            />
                        )}
                        <Input
                            name='new-password'
                            form={form}
                            type='password'
                            label={t(LANGUAGE.NEW_PASSWORD)}
                            disabled={loading.submit}
                        />
                        <Input
                            name='re-password'
                            form={form}
                            type='password'
                            label={t(LANGUAGE.RE_PASSWORD)}
                            disabled={loading.submit}
                        />
                    </FormWrap>
                </div>
            </div>
        </Transaction>
    )
}

export default ChangePassword
