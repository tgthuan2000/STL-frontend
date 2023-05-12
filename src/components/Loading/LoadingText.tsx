import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface LoadingTextProps {
    className?: string
    text?: React.ReactNode
    cancelAnimate?: boolean
}

const LoadingText: React.FC<LoadingTextProps> = ({ className, text, cancelAnimate }) => {
    const { t } = useTranslation()
    return (
        <span
            className={clsx(
                'inline-block truncate text-gray-700 dark:text-slate-200',
                { 'animate-pulse': !cancelAnimate },
                className
            )}
        >
            {text ?? t(LANGUAGE.LOADING)}
        </span>
    )
}

export default LoadingText
