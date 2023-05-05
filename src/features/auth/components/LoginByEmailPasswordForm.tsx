import { SanityDocument } from '@sanity/client'
import { isEmpty } from 'lodash'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IUserProfile, LoginByEmailPasswordFormProps, SubmitPassword } from '~/@types/auth'
import { AnimateWrap, BackButton } from '~/components'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { getActiveUsersByEmail } from '../services'
import Step1 from './Step1'
import Step2 from './Step2'

const LoginByEmailPasswordForm: React.FC<LoginByEmailPasswordFormProps> = ({ onSubmit, onBack }) => {
    const { t } = useTranslation()
    const [step, setStep] = useState(1)
    const { loading, setSubmitLoading } = useLoading()
    const [previewData, setPreviewData] = useState<Array<SanityDocument<IUserProfile>> | null>(null)

    const onSubmitEmail = async ({ email }: { email: string }) => {
        try {
            setSubmitLoading(true)
            const data = await getActiveUsersByEmail(email.trim().toLowerCase())
            if (data && !isEmpty(data)) {
                setPreviewData(data)
                setStep(2)
            } else {
                toast.error(t(LANGUAGE.NOTIFY_NOT_EXIST_ACCOUNT))
            }
        } catch (error) {
            toast.error(t(LANGUAGE.NOTIFY_ERROR))
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

        return steps[step] ?? t(LANGUAGE.UNKNOWN_STEP)
    }, [step])

    return (
        <div className='space-y-2'>
            <BackButton onClick={handleBack} disabled={loading.submit || loading.config} />
            <AnimateWrap>{stepData}</AnimateWrap>
        </div>
    )
}

export default LoginByEmailPasswordForm
