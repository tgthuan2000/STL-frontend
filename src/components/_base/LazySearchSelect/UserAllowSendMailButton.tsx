import { EnvelopeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface UserAllowSendMailButtonProps {
    disabled?: boolean
    active?: boolean
    onClick?: () => void
    className?: string
    hidden?: boolean
}

const UserAllowSendMailButton: React.FC<UserAllowSendMailButtonProps> = ({
    disabled,
    active,
    className,
    hidden,
    onClick,
}) => {
    const { t } = useTranslation()

    if (hidden) {
        return <></>
    }

    return (
        <button
            title={t(LANGUAGE.SEND_NOTIFY_BY_EMAIL) as string}
            type='button'
            disabled={disabled}
            className={clsx(
                'cursor-pointer rounded-lg p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50',
                active
                    ? 'bg-cyan-400 text-gray-100 disabled:bg-cyan-700 disabled:text-gray-400'
                    : 'bg-slate-100 text-gray-400 hover:bg-gray-400 hover:text-white disabled:text-gray-500 disabled:hover:bg-slate-100 dark:bg-slate-700 dark:hover:opacity-70 dark:disabled:bg-slate-700',
                className
            )}
            onClick={onClick}
        >
            <EnvelopeIcon className='h-5' />
        </button>
    )
}

export default UserAllowSendMailButton
