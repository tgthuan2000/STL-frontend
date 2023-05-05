import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button, TwoFactorForm } from '~/components'
import { useLoading } from '~/context'
import { useLogout } from '~/hook'
import useAxios from '~/hook/useAxios'
import LANGUAGE from '~/i18n/language/key'

interface DisabledTwoFactorProps {
    onClose: () => void
}

const DisabledTwoFactor: React.FC<DisabledTwoFactorProps> = ({ onClose }) => {
    const { t } = useTranslation()
    const { setSubmitLoading } = useLoading()
    const logout = useLogout()
    const axios = useAxios()

    const handleSubmit = async (data: string) => {
        try {
            setSubmitLoading(true)
            await axios.post('/auth/disabled-2fa', { code: data })
            await logout()
            onClose()
            toast.success(t(LANGUAGE.NOTIFY_DISABLED_TWO_FA_SUCCESS))
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className='flex h-full flex-col pt-10 text-gray-900 dark:text-slate-200'>
            <div className='flex flex-1 flex-col items-center justify-center gap-10'>
                <p className='w-full max-w-[450px] px-10 text-center text-sm sm:text-base'>
                    {t(LANGUAGE.TWO_FA_DESCRIPTION)}
                </p>
                <TwoFactorForm onSubmit={handleSubmit} />
            </div>
            <div className='mt-10 flex-shrink-0 select-none'>
                <div className='flex justify-end gap-2 p-5'>
                    <Button
                        type='button'
                        color='custom'
                        className='border-none py-1 px-2 text-gray-400 hover:opacity-50 sm:text-base'
                        onClick={onClose}
                    >
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DisabledTwoFactor
