import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import WarningGif from '~/assets/warning.gif'
import { PERMISSION } from '~/constant/permission'
import { useConfig } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import LoadingAnimate from './Loading/LoadingAnimate'

export interface Props {
    permissions: PERMISSION[]
    children: React.ReactNode
    fallback?: React.ReactNode
    suspenseFallback?: React.ReactNode
}

const PermissionCheck: React.FC<Props> = (props) => {
    const { permissions, children, fallback, suspenseFallback } = props
    const { t } = useTranslation()
    const { hasPermissions } = useConfig()
    const navigation = useNavigate()
    if (hasPermissions(permissions)) {
        return <Suspense fallback={suspenseFallback ?? <LoadingAnimate />}>{children}</Suspense>
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
