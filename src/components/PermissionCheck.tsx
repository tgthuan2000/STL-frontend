import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PermissionCheckProps } from '~/@types/components'
import WarningGif from '~/assets/warning.gif'
import { useConfig } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const PermissionCheck: React.FC<PermissionCheckProps> = ({ permissions, children }) => {
    const { t } = useTranslation()
    const { hasPermissions } = useConfig()
    const navigation = useNavigate()
    if (hasPermissions(permissions)) {
        return <>{children}</>
    }

    return (
        <div className='flex flex-col gap-2 max-w-4xl mx-auto items-center justify-center bg-white dark:bg-slate-800 rounded-lg p-5'>
            <img src={WarningGif} className='w-80 rounded-xl' />
            <p className='font-normal text-radical-red-500 text-lg text-center'>{t(LANGUAGE.NOT_ROLE)}</p>
            <button
                className='hover:underline hover:text-prussian-blue-400 text-gray-900 dark:text-slate-200 transition-colors text-base'
                onClick={() => navigation('/')}
            >
                {t(LANGUAGE.BACK_TO_HOME)}
            </button>
        </div>
    )
}

export default PermissionCheck
