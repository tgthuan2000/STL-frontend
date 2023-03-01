import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface LoadingTextProps {
    className?: string
}

const LoadingText: React.FC<LoadingTextProps> = ({ className }) => {
    const { t } = useTranslation()
    return (
        <span className={clsx('inline-block animate-pulse text-gray-700 dark:text-slate-200', className)}>
            {t(LANGUAGE.LOADING)}
        </span>
    )
}

export default LoadingText
