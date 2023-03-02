import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PermissionCheckProps } from '~/@types/components'
import WarningGif from '~/assets/warning.gif'
import { useConfig } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const PermissionCheck: React.FC<PermissionCheckProps> = ({ permissions, children, fallback }) => {
    const { t } = useTranslation()
    const { hasPermissions } = useConfig()
    const navigation = useNavigate()
    if (hasPermissions(permissions)) {
        return <>{children}</>
    }

    if (fallback) {
        return <>{fallback}</>
    }

    return (
        <div className='mx-auto flex max-w-4xl flex-col items-center justify-center gap-2 rounded-lg bg-white p-5 dark:bg-slate-800'>
            <img src={WarningGif} className='w-80 rounded-xl' />
            <p className='text-center text-lg font-normal text-radical-red-500'>{t(LANGUAGE.NOT_ROLE)}</p>
            <button
                className='text-base text-gray-900 transition-colors hover:text-prussian-blue-400 hover:underline dark:text-slate-200'
                onClick={() => navigation('/')}
            >
                {t(LANGUAGE.BACK_TO_HOME)}
            </button>
        </div>
    )
}

export default PermissionCheck
