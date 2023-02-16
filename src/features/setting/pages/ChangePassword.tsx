import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '~/axiosConfig'
import { Button, SubmitWrap, Transaction } from '~/components'
import { Input } from '~/components/_base'
import { CODE } from '~/constant/code'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_PASSWORD_BY_ID } from '~/schema/query/login'
import useAuth from '~/store/auth'
import { changePasswordSchema } from '../services/schema'

const ChangePassword = () => {
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { userProfile, removeUserProfile } = useAuth()
    const navigate = useNavigate()

    const isHasPassword = get(userProfile, 'isHasPassword', false)

    const form = useForm({
        mode: 'onBlur',
        defaultValues: {
            'old-password': '',
            'new-password': '',
            're-password': '',
            __isHasPassword: isHasPassword,
        },
        resolver: yupResolver(changePasswordSchema),
    })

    const onSubmit: SubmitHandler<{
        'old-password': string
        'new-password': string
        're-password': string
    }> = async (data) => {
        try {
            setSubmitLoading(true)
            const __ = client.transaction()
            const { 'new-password': newPassword, 'old-password': oldPassword } = data

            if (isHasPassword) {
                const { data } = await axios.post<{ code: string }>('/auth/change-password', {
                    oldPassword,
                    newPassword,
                    _id: userProfile?._id,
                })
                switch (data.code) {
                    case CODE.SUCCESS:
                        toast.success(t(LANGUAGE.NOTIFY_UPDATE_PASSWORD_SUCCESS))
                        removeUserProfile()
                        break
                }
            }

            // if (isHasPassword) {
            //     const d = await client.fetch<{ password: string }>(GET_PASSWORD_BY_ID, {
            //         _id: userProfile?._id,
            //     })
            //     const isCorrectPassword = bcrypt.compareSync(oldPassword, d.password)
            //     if (!isCorrectPassword) {
            //         toast.error(t(LANGUAGE.OLD_PASSWORD_INCORRECT))
            //         return
            //     }
            // }

            // __.patch(userProfile?._id as string, { set: { password: bcrypt.hashSync(newPassword) } })

            // await __.commit()

            // toast.success(t(LANGUAGE.NOTIFY_UPDATE_PASSWORD_SUCCESS))
            // removeUserProfile()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Transaction title={t(LANGUAGE.CHANGE_PASSWORD)}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='bg-white dark:bg-slate-800 rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                    <div className='max-w-lg w-full mx-auto'>
                        <div className='flex h-full flex-col'>
                            {userProfile && !isHasPassword && (
                                <div className='flex items-center gap-2 text-white bg-yellow-500 p-3 rounded-md select-none mx-2'>
                                    <ExclamationTriangleIcon className='h-6' />
                                    <p className='font-normal'>Tài khoản này chưa đặt mật khẩu!</p>
                                </div>
                            )}
                            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                                <div className='flex flex-1 flex-col justify-between'>
                                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                        <div className='space-y-6 pt-6 pb-5'>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
            </form>
        </Transaction>
    )
}

export default ChangePassword
