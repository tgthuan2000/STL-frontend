import { ExclamationIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Transaction } from '~/components'
import { Input } from '~/components/_base'
import { useLoading } from '~/context'
import useAuth from '~/store/auth'
import * as yup from 'yup'
import { client } from '~/sanityConfig'
import bcrypt from 'bcryptjs'
import { GET_PASSWORD_BY_ID } from '~/schema/query/login'

const schema = yup.object().shape({
    'old-password': yup
        .string()
        .nullable()
        .when('__isHasPassword', {
            is: true,
            then: yup.string().required('Mật khẩu cũ không được để trống!'),
        }),
    'new-password': yup
        .string()
        .required('Mật khẩu mới không được để trống!')
        .min(1, 'Mật khẩu mới phải có ít nhất 1 ký tự!'),
    're-password': yup
        .string()
        .required('Nhập lại mật khẩu không được để trống!')
        .oneOf([yup.ref('new-password')], 'Mật khẩu không khớp!'),
})

const ChangePassword = () => {
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
        resolver: yupResolver(schema),
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
                const d = await client.fetch<{ password: string }>(GET_PASSWORD_BY_ID, {
                    _id: userProfile?._id,
                })
                const isCorrectPassword = bcrypt.compareSync(oldPassword, d.password)
                if (!isCorrectPassword) {
                    toast.error('Mật khẩu cũ không đúng!')
                    return
                }
            }

            __.patch(userProfile?._id as string, {
                set: {
                    password: bcrypt.hashSync(newPassword),
                },
            })

            await __.commit()

            toast.success('Cập nhật mật khẩu thành công!')
            removeUserProfile()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Transaction title='Đổi mật khẩu'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='bg-white rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                    <div className='max-w-lg w-full mx-auto'>
                        <div className='flex h-full flex-col'>
                            {userProfile && !isHasPassword && (
                                <div className='flex items-center gap-2 text-white bg-yellow-500 p-3 rounded-md select-none mx-2'>
                                    <ExclamationIcon className='h-6' />
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
                                                    label='Mật khẩu cũ'
                                                    disabled={loading.submit}
                                                />
                                            )}
                                            <Input
                                                name='new-password'
                                                form={form}
                                                type='password'
                                                label='Mật khẩu mới'
                                                disabled={loading.submit}
                                            />
                                            <Input
                                                name='re-password'
                                                form={form}
                                                type='password'
                                                label='Nhập lại mật khẩu'
                                                disabled={loading.submit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                                <div className='flex sm:justify-start justify-end space-x-3'>
                                    <Button color='blue' type='submit' disabled={loading.submit}>
                                        Cập nhật
                                    </Button>
                                    <Button
                                        color='outline'
                                        type='button'
                                        onClick={() => {
                                            navigate(-1)
                                        }}
                                    >
                                        Hủy bỏ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Transaction>
    )
}

export default ChangePassword
