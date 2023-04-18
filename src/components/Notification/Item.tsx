import { Menu } from '@headlessui/react'
import { CheckIcon, UserIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import moment from 'moment'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NotificationItemProps } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import { useService } from '~/services'
import Prose from '../Prose'

const NotificationItem: React.FC<NotificationItemProps> = ({ data, onItemRead, onReadDetail }) => {
    const { t } = useTranslation()
    const [isClickRead, setIsClickRead] = useState(false)
    const { getSpacingTime } = useService()

    return (
        <div className='space-y-0.5 px-2 py-1'>
            <Menu.Item>
                <div
                    className={clsx(
                        'flex w-full cursor-pointer flex-col rounded-md px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-600',
                        !data.read ? 'bg-gray-100 dark:bg-slate-700' : 'bg-transparent'
                    )}
                    onClick={() => onReadDetail(data)}
                    title={t(LANGUAGE.CLICK_TO_READ_DETAIL) as string}
                >
                    <div className='flex justify-between gap-3'>
                        <h4 className='flex-1 truncate text-sm font-normal text-gray-900 dark:text-slate-100 lg:text-base'>
                            {data.notify.title}
                        </h4>
                        <span
                            className='flex flex-shrink-0 items-center gap-0.5 text-xs text-cyan-400 lg:text-sm'
                            title={t(LANGUAGE.VIEWERS) as string}
                        >
                            <span>{data.notify.viewers ?? 0}</span>
                            <UserIcon className='h-4 w-4' />
                        </span>
                    </div>
                    <Prose
                        className={clsx(
                            'mt-1 max-w-[calc(100%-40px)] text-xs line-clamp-3 dark:text-slate-100 sm:max-w-[calc(100%-80px)]',
                            {
                                'italic text-gray-400': !data.notify.description,
                                'text-gray-500': !!data.notify.description,
                            }
                        )}
                    >
                        {data.notify.description ?? t(LANGUAGE.EMPTY_DESCRIPTION)}
                    </Prose>
                    <div className='mt-2 flex items-center justify-between'>
                        <div>
                            {!data.read ? (
                                isClickRead ? (
                                    <p className='flex items-center gap-0.5 text-xs font-normal text-cyan-500 lg:text-sm'>
                                        <CheckIcon className='h-4 w-4' />
                                        {t(LANGUAGE.READ)}
                                    </p>
                                ) : (
                                    <button
                                        className='text-xs font-medium text-cyan-500 hover:underline lg:text-sm'
                                        onClick={(e) => {
                                            setIsClickRead(true)
                                            onItemRead(e, data)
                                        }}
                                    >
                                        {t(LANGUAGE.READ)}
                                    </button>
                                )
                            ) : (
                                <p className='text-xs text-gray-400 dark:text-slate-100'>
                                    {t(LANGUAGE.READ)}: <b>{moment(data._updatedAt).format(DATE_FORMAT.TIME_DATE)}</b>
                                </p>
                            )}
                        </div>
                        <p className='text-xs italic text-gray-400 dark:text-slate-100'>
                            {getSpacingTime(data._createdAt)}
                        </p>
                    </div>
                </div>
            </Menu.Item>
        </div>
    )
}

export default NotificationItem
