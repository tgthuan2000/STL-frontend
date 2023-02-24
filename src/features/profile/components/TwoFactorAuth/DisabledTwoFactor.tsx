import { googleLogout } from '@react-oauth/google'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from '~/axiosConfig'
import { TwoFactorForm } from '~/components'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { useAuth, useProfile } from '~/store/auth'

interface DisabledTwoFactorProps {
    onClose: () => void
}

const DisabledTwoFactor: React.FC<DisabledTwoFactorProps> = ({ onClose }) => {
    const { t } = useTranslation()
    const { setSubmitLoading } = useLoading()
    const { removeToken } = useAuth()
    const { removeUserProfile } = useProfile()

    const handleSubmit = async (data: string) => {
        try {
            setSubmitLoading(true)
            await axios.post('/auth/disabled-2fa', { code: data })
            onClose()
            toast.success(t(LANGUAGE.NOTIFY_DISABLED_TWO_FA_SUCCESS))
            removeToken()
            removeUserProfile()
            googleLogout()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className='flex h-full flex-col'>
            {/* Header */}
            <h1 className='flex-shrink-0 select-none text-2xl font-normal sm:text-3xl'>
                {t(LANGUAGE.DISABLED_TWO_FA_SETUP)}
            </h1>
            {/* Content */}
            <div className='flex flex-1 flex-col items-center justify-center gap-3'>
                <p className='text-left text-sm'>{t(LANGUAGE.DISABLED_TWO_FA_DESCRIPTION)}</p>
                <TwoFactorForm onSubmit={handleSubmit} />
            </div>
            {/* Footer */}
            <div className='flex-shrink-0 select-none'>
                <div className='flex justify-end gap-2'>
                    <button
                        type='button'
                        className='py-1 px-2 text-gray-400 hover:opacity-50 sm:text-base'
                        onClick={onClose}
                    >
                        {t(LANGUAGE.CANCEL)}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DisabledTwoFactor
