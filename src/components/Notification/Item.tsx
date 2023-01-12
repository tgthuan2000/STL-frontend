import { Menu } from '@headlessui/react'
import { CheckIcon, UserIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import moment from 'moment'
import React, { useState } from 'react'
import { NotificationItemProps } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import { TEMPLATE } from '~/constant/template'
import { getSpacingTime } from '~/services'
import Prose from '../Prose'

const NotificationItem: React.FC<NotificationItemProps> = ({ data, onItemRead, onReadDetail }) => {
    const [isClickRead, setIsClickRead] = useState(false)

    return (
        <div className='px-1 py-1 space-y-0.5'>
            <Menu.Item>
                <div
                    className={clsx('flex flex-col w-full rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer', {
                        'bg-gray-100': !data.read,
                    })}
                    onClick={() => onReadDetail(data)}
                    title='Nhấn để xem chi tiết'
                >
                    <div className='flex justify-between gap-3'>
                        <h4 className='flex-1 font-normal text-sm lg:text-base truncate'>{data.notify.title}</h4>
                        <span
                            className='flex items-center gap-0.5 flex-shrink-0 text-cyan-400 lg:text-sm text-xs'
                            title='Số người đã xem'
                        >
                            <span>{data.notify.viewers ?? 0}</span>
                            <UserIcon className='h-4 w-4' />
                        </span>
                    </div>
                    <Prose
                        className={clsx('text-xs mt-1 line-clamp-3 max-w-[calc(100%-80px)]', {
                            'italic text-gray-400': !data.notify.description,
                            'text-gray-500': !!data.notify.description,
                        })}
                    >
                        {data.notify.description ?? TEMPLATE.EMPTY_DESCRIPTION}
                    </Prose>
                    <div className='mt-2 flex justify-between items-center'>
                        <div>
                            {!data.read ? (
                                isClickRead ? (
                                    <p className='text-cyan-500 font-normal flex items-center gap-0.5'>
                                        <CheckIcon className='h-4 w-4' />
                                        Đã xem
                                    </p>
                                ) : (
                                    <button
                                        className='text-cyan-500 text-xs lg:text-sm font-medium hover:underline'
                                        onClick={(e) => {
                                            setIsClickRead(true)
                                            onItemRead(e, data)
                                        }}
                                    >
                                        Đã xem
                                    </button>
                                )
                            ) : (
                                <p className='text-xs text-gray-400'>
                                    Đã xem: <b>{moment(data._updatedAt).format(DATE_FORMAT.TIME_DATE)}</b>
                                </p>
                            )}
                        </div>
                        <p className='italic text-xs text-gray-400'>{getSpacingTime(data._createdAt)}</p>
                    </div>
                </div>
            </Menu.Item>
        </div>
    )
}

export default NotificationItem
