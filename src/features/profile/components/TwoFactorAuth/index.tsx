import { useTranslation } from 'react-i18next'
import { useDetailDialog } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import DisabledTwoFactor from './DisabledTwoFactor'
import TwoFactor from './TwoFactor'

interface TwoFactorForm {
    enable: boolean
}

const TwoFactorAuth = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { set, close } = useDetailDialog()

    const handleDisable2FA = () => {
        set({
            title: t(LANGUAGE.DISABLED_2FA),
            content: <DisabledTwoFactor onClose={close} />,
        })
    }

    const handleSetup2FA = () => {
        set({
            title: t(LANGUAGE.TWO_FA_SETUP),
            content: <TwoFactor onClose={close} />,
        })
    }

    return (
        <>
            <div className='flex items-center justify-between'>
                <label className='text-base'>{t(LANGUAGE.TWO_FACTOR_AUTHENTICATION)}</label>

                {userProfile?.twoFA ? (
                    <button
                        type='button'
                        onClick={handleDisable2FA}
                        className='rounded-md border border-radical-red-500 bg-radical-red-50 py-2 px-4 font-medium text-radical-red-500 transition-all hover:bg-radical-red-500 hover:text-white dark:bg-transparent dark:hover:bg-radical-red-500'
                    >
                        {t(LANGUAGE.DISABLED_2FA)}
                    </button>
                ) : (
                    <button
                        type='button'
                        onClick={handleSetup2FA}
                        className='rounded-md border border-pink-500 bg-pink-50 py-2 px-4 font-medium text-pink-500 transition-all hover:bg-pink-500 hover:text-white dark:bg-transparent dark:hover:bg-pink-500'
                    >
                        {t(LANGUAGE.SET_UP)}
                    </button>
                )}
            </div>
        </>
    )
}

export default TwoFactorAuth
