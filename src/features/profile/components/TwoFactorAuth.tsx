import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import TwoFactorDialog from './TwoFactorDialog'

interface TwoFactorForm {
    enable: boolean
}

const TwoFactorAuth = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const form = useForm<TwoFactorForm>({
        defaultValues: {
            enable: userProfile?.enableTwoFactor,
        },
    })
    const [{ show, enable }, setConfigTwoFactor] = useState({
        show: false,
        enable: false,
    })

    const _showTwoFactor = (enable: boolean) => {
        setConfigTwoFactor({
            show: true,
            enable,
        })
    }

    const handleSubmit: SubmitHandler<TwoFactorForm> = async (data) => {
        if (data.enable) {
            _showTwoFactor(false)
            return
        }
        _showTwoFactor(true)
    }

    const _closeDialog = () => {
        setConfigTwoFactor({
            show: false,
            enable: false,
        })
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='flex items-center justify-between'>
                    <label className='text-base'>{t(LANGUAGE.TWO_FACTOR_AUTHENTICATION)}</label>

                    {userProfile?.enableTwoFactor ? (
                        <button
                            type='submit'
                            className='rounded-md border border-radical-red-500 bg-radical-red-50 py-2 px-4 font-medium text-radical-red-500 transition-all hover:bg-radical-red-500 hover:text-white dark:bg-transparent dark:hover:bg-radical-red-500'
                        >
                            {t(LANGUAGE.DISABLED)}
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='rounded-md border border-pink-500 bg-pink-50 py-2 px-4 font-medium text-pink-500 transition-all hover:bg-pink-500 hover:text-white dark:bg-transparent dark:hover:bg-pink-500'
                        >
                            {t(LANGUAGE.SET_UP)}
                        </button>
                    )}
                </div>
            </form>
            <TwoFactorDialog isShow={show && enable} title='2FA setup' onClose={_closeDialog} />
        </>
    )
}

export default TwoFactorAuth
