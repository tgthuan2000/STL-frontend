import { ArrowPathIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Image } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { useService } from '~/services'

interface Props {
    id: string
    userName: string
    email: string
    image: string
    message: string
    isActive: boolean
    createdAt: string
    url: string
    edited: boolean
    onResponseClick: (id: string) => void
}

const User: React.FC<Props> = (props) => {
    const { id, userName, email, image, message, isActive, url, createdAt, edited, onResponseClick } = props
    const { t } = useTranslation()
    const { getSpacingTime } = useService()

    return (
        <Link
            key={id}
            to={url}
            className={clsx(
                'group flex cursor-pointer flex-col space-y-2 py-3 px-4 hover:bg-gray-200 dark:hover:bg-slate-700',
                {
                    'bg-gray-200 dark:bg-slate-700': isActive,
                }
            )}
        >
            <div className={clsx('flex cursor-pointer items-center gap-2')}>
                <Image src={image} alt={userName} avatar={{ roundFull: true, size: 'custom' }} className='h-8 w-8' />

                <div className='flex-1'>
                    <p className='truncate font-medium text-gray-900 dark:text-slate-200'>{userName}</p>
                    <small className='block truncate font-normal text-gray-500'>{email}</small>
                </div>

                <div className='flex-shrink-0'>
                    <Button
                        active={isActive}
                        title={t(LANGUAGE.RESPONDED) as string}
                        icon={<CheckBadgeIcon className='h-7 w-7' />}
                        loadingIcon={<ArrowPathIcon className='h-7 w-7 animate-spin cursor-wait' />}
                        onClick={() => onResponseClick(id)}
                    />
                </div>
            </div>
            <p className='text-sm line-clamp-3' title={message}>
                {message}
            </p>
            <div className='flex items-center justify-between'>
                <span className='select-none whitespace-nowrap text-xs text-gray-500 dark:text-slate-400'>
                    {getSpacingTime(createdAt)}
                </span>

                {edited && (
                    <span className='text-xs italic text-gray-500 dark:text-slate-500'>{t(LANGUAGE.EDITED)}</span>
                )}
            </div>
        </Link>
    )
}

interface ButtonProps {
    onClick: () => void
    icon: React.ReactNode
    loadingIcon: React.ReactNode
    title?: string
    active?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, icon, loadingIcon, title, active } = props
    const [clicked, setClicked] = useState(false)

    const Icon = clicked ? loadingIcon : icon

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setClicked(true)
        onClick()
    }

    return (
        <button
            type='button'
            onClick={handleClick}
            className={clsx(
                'rounded-lg p-1.5 text-gray-700 transition hover:bg-gray-400 hover:text-gray-200 dark:text-cyan-500 dark:hover:bg-slate-800',
                active || clicked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            )}
            title={title}
            disabled={clicked}
        >
            {Icon}
        </button>
    )
}

export default User
