import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import { SanityDocument } from '@sanity/client'
import { isEmpty } from 'lodash'
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { IUserProfile, LoginByEmailPasswordFormProps, SubmitPassword } from '~/@types/auth'
import { useLoading } from '~/context'
import { getDataByEmail } from '../services'
import Step1 from './Step1'
import Step2 from './Step2'

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
                className='p-1 bg-slate-200 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer transition-colors group rounded-full inline-block disabled:opacity-50'
                onClick={handleBack}
                disabled={loading.submit || loading.config}
            >
                <ArrowSmLeftIcon className='h-6 text-gray-700 group-hover:text-white dark:text-slate-200 dark:group-hover:text-slate-700 transition-colors' />
            </button>

            <div ref={stepParent}>{stepData}</div>
        </div>
    )
}

export default LoginByEmailPasswordForm
