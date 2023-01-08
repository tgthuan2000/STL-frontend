import React, { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '~/components/_base'
import { Button } from '~/components'
import { ArrowSmLeftIcon, ExclamationIcon } from '@heroicons/react/outline'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { getDataByEmail } from '../services'
import { SanityDocument } from '@sanity/client'
import { IUserProfile, LoginForm } from '~/@types/auth'
import { toast } from 'react-toastify'
import { useLoading } from '~/context'
import { isEmpty } from 'lodash'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { UserSvg } from '~/components/_constant'

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
    const [previewData, setPreviewData] = useState<Array<SanityDocument<IUserProfile>> | null>(null)

    const onSubmitEmail = async ({ email }: { email: string }) => {
        try {
            setSubmitLoading(true)
            const data = await getDataByEmail(email)
            if (data && !isEmpty(data)) {
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

    const onSubmitPassword: SubmitPassword = async ({ password }, data) => {
        onSubmit({ password, data })
    }

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => prev - 1)
            return
        }
        onBack()
    }

    const stepData = useMemo(() => {
        const steps: { [x: number]: React.ReactNode } = {
            1: <Step1 onSubmit={onSubmitEmail} />,
            2: <Step2 previewData={previewData} onSubmit={onSubmitPassword} />,
        }

        return steps[step] ?? 'Unknown step'
    }, [step])

    return (
        <div className='space-y-2'>
            <button
                className='p-1 bg-slate-200 hover:bg-slate-700 cursor-pointer transition-colors group rounded-full inline-block disabled:opacity-50'
                onClick={handleBack}
                disabled={loading.submit || loading.config}
            >
                <ArrowSmLeftIcon className='h-6 text-gray-700 group-hover:text-white transition-colors' />
            </button>

            <div ref={stepParent}>{stepData}</div>
        </div>
    )
}

export default LoginByEmailPasswordForm

interface Step1Props {
    onSubmit: (data: { email: string }) => void
}

const Step1: React.FC<Step1Props> = ({ onSubmit }) => {
    const { loading } = useLoading()
    const form = useForm<{ email: string }>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(emailSchema),
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-2'>
                <Input name='email' form={form} label='Tài khoản (email)' disabled={loading.submit} autoFocus />
                <Button className='!text-xs' color='cyan' type='submit' disabled={loading.submit}>
                    Tiếp theo
                </Button>
            </div>
        </form>
    )
}

type SubmitPassword = (payloads: { password: string }, data: SanityDocument<IUserProfile>) => void
interface Step2Props {
    previewData: SanityDocument<IUserProfile>[] | null
    onSubmit: SubmitPassword
}

const Step2: React.FC<Step2Props> = ({ previewData, onSubmit }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [chose, setChose] = useState<SanityDocument<IUserProfile> | null | undefined>(previewData?.[0])
    const { loading } = useLoading()
    const form = useForm<{ password: string }>({
        mode: 'onBlur',
        defaultValues: {
            password: '',
        },
        resolver: yupResolver(passwordSchema),
    })
    const handleSubmit: SubmitHandler<{ password: string }> = (data) => {
        if (!chose) return
        onSubmit(data, chose)
    }
    return (
        <div className='space-y-3'>
            {!isEmpty(previewData) && (
                <div className='bg-white shadow-md rounded-lg select-none overflow-hidden'>
                    {previewData?.map((data) => {
                        const checked = data._id === chose?._id
                        return (
                            <div
                                className='px-4 py-2 flex gap-2 items-center cursor-pointer'
                                onClick={() => !checked && setChose(data)}
                            >
                                {data.image ? (
                                    <img
                                        src={data.image}
                                        alt={data.userName}
                                        className='h-8 w-8 rounded-full flex-shrink-0 object-cover'
                                    />
                                ) : (
                                    <div className='h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-400'>
                                        <UserSvg />
                                    </div>
                                )}
                                <div className='flex-1 max-w-[250px]'>
                                    <p className='font-medium text-gray-900 truncate'>{data.userName}</p>
                                    <small className='font-normal text-gray-500 truncate block'>{data.email}</small>
                                </div>
                                {checked && <CheckCircleIcon className='h-6 text-cyan-500' />}
                            </div>
                        )
                    })}
                </div>
            )}
            <div ref={parent}>
                {chose?.isHasPassword ? (
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
                        <Input
                            name='password'
                            form={form}
                            label='Mật khẩu'
                            type='password'
                            disabled={loading.config}
                            autoFocus
                        />
                        <Button className='!text-xs' color='cyan' type='submit' disabled={loading.config}>
                            Đăng nhập
                        </Button>
                    </form>
                ) : (
                    <div className='flex items-center gap-2 text-white bg-yellow-500 p-3 rounded-md select-none'>
                        <ExclamationIcon className='h-6' />
                        <p className='font-normal'>Tài khoản này chưa cài đặt mật khẩu!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
