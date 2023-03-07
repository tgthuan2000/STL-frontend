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
                `
                cursor-pointer 
                rounded-lg 
                p-2 
                transition-all
                hover:bg-cyan-500
                disabled:cursor-not-allowed
                disabled:bg-slate-700
                disabled:text-gray-500
            `,
                active ? 'bg-cyan-400 text-gray-100' : 'bg-slate-100 text-gray-400 dark:bg-slate-700',
                className
            )}
            onClick={onClick}
        >
            <EnvelopeIcon className='h-5' />
        </button>
    )
}

export default UserAllowSendMailButton
