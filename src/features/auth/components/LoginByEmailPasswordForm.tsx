import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '~/components/_base'
import { Button } from '~/components'
import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { getDataByEmail } from '../services'
import { SanityDocument } from '@sanity/client'
import { IUserProfile, LoginForm } from '~/@types/auth'
import { toast } from 'react-toastify'
import { useLoading } from '~/context'
import { urlFor } from '~/sanityConfig'

const emailSchema = yup.object().shape({
    email: yup.string().email('Định dạng không hợp lệ').required('Yêu cầu nhập!'),
})
const passwordSchema = yup.object().shape({
    password: yup.string().required('Yêu cầu nhập!'),
})

interface LoginByEmailPasswordFormProps {
    onSubmit: (data: LoginForm) => Promise<void>
    onBack: () => void
}

const LoginByEmailPasswordForm: React.FC<LoginByEmailPasswordFormProps> = ({ onSubmit, onBack }) => {
    const [stepParent] = useAutoAnimate<HTMLDivElement>()
    const [step, setStep] = useState(1)
    const { loading, setSubmitLoading } = useLoading()

    const [previewData, setPreviewData] = useState<SanityDocument<IUserProfile> | null>(null)
    const emailForm = useForm<{ email: string }>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(emailSchema),
    })
    const passwordForm = useForm<{ password: string }>({
        mode: 'onBlur',
        defaultValues: {
            password: '',
        },
        resolver: yupResolver(passwordSchema),
    })

    const onSubmitEmail = async ({ email }: { email: string }) => {
        try {
            setSubmitLoading(true)
            const data = await getDataByEmail(email)
            if (data) {
                setPreviewData(data)
                setStep(2)
            } else {
                toast.error('Tài khoản không tồn tại')
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra')
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitPassword = async ({ password }: { password: string }) => {
        if (!previewData) return
        onSubmit({ password, data: previewData })
    }

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => prev - 1)
            return
        }
        onBack()
    }

    return (
        <div className='space-y-2'>
            <button
                className='p-1 bg-slate-200 hover:bg-slate-700 cursor-pointer transition-colors group rounded-full inline-block disabled:opacity-50'
                onClick={handleBack}
                disabled={loading.submit}
            >
                <ArrowSmLeftIcon className='h-6 text-gray-700 group-hover:text-white transition-colors' />
            </button>

            <div ref={stepParent}>
                {step === 1 && (
                    <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
                        <div className='space-y-2'>
                            <Input name='email' form={emailForm} label='Tài khoản (email)' disabled={loading.submit} />
                            <Button className='!text-xs' color='cyan' type='submit' disabled={loading.submit}>
                                Tiếp theo
                            </Button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
                        <div className='space-y-2'>
                            {previewData && (
                                <div className='py-2 px-4 bg-white shadow-md rounded-lg'>
                                    <div className='flex gap-2 items-center'>
                                        <img
                                            src={previewData.image}
                                            alt={previewData.userName}
                                            className='h-8 w-8 rounded-full flex-shrink-0 object-cover'
                                        />
                                        <div className='flex-1 max-w-[250px]'>
                                            <p className='font-medium text-gray-900 truncate'>{previewData.userName}</p>
                                            <small className='font-normal text-gray-500 truncate block'>
                                                {previewData.email}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Input
                                name='password'
                                form={passwordForm}
                                label='Mật khẩu'
                                type='password'
                                disabled={loading.submit}
                            />
                            <Button className='!text-xs' color='cyan' type='submit' disabled={loading.submit}>
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default LoginByEmailPasswordForm
