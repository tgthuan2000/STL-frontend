import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { ItemReadEvent, NotificationProps, ReadDetailEvent } from '~/@types/components'
import BellIcon from '~/assets/notification.gif'
import { useNotify } from '~/context'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import EmptyNotify from './Empty'
import NotificationItem from './Item'
import SkeletonNotify from './Skeleton'

const Notification: React.FC<NotificationProps> = () => {
    const { t } = useTranslation()
    const { width } = useWindowSize()
    const [parentRef] = useAutoAnimate<HTMLDivElement>()
    const [readAllRef] = useAutoAnimate<HTMLButtonElement>()
    const [notifyRef] = useAutoAnimate<HTMLDivElement>()
    const navigate = useNavigate()
    const { notify, loadNewNotify, total, hasNextPage, loading, getMore, readDetail } = useNotify()

    const handleReadDetail: ReadDetailEvent = async (data) => {
        navigate(`/notify/${data.notify._id}`)
    }

    const handleItemRead: ItemReadEvent = async (e, data) => {
        e.stopPropagation()
        e.preventDefault()

        await readDetail(data)
    }

    return (
        <Menu as='div' className='relative mr-3 inline-block'>
            <Menu.Button className='group px-2 pt-1'>
                <div className='relative' ref={notifyRef}>
                    <img src={BellIcon} className='h-8 w-8 rounded' />
                    <span className='absolute -top-3 -right-3 inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-radical-red-500 text-xs text-white dark:bg-prussian-blue-400'>
                        {total > 99 ? '99+' : total}
                    </span>
                    {loadNewNotify && (
                        <span
                            className={clsx(
                                'absolute top-1/2 right-10 inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-radical-red-500 p-2 text-xs font-medium text-white dark:bg-prussian-blue-400'
                            )}
                        >
                            {t(LANGUAGE.NEW_NOTIFY)}
                        </span>
                    )}
                </div>
            </Menu.Button>

            <Menu.Items
                className={clsx(
                    'absolute right-0 mt-2 w-[320px] origin-top-left select-none divide-y divide-gray-100 whitespace-nowrap rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-slate-600 dark:bg-slate-800 sm:w-[500px]'
                )}
            >
                {isEmpty(notify) ? (
                    <EmptyNotify />
                ) : (
                    <>
                        <div className='flex justify-between'>
                            <h1 className='p-2 text-base font-medium text-gray-900 dark:text-white'>
                                {t(LANGUAGE.NOTIFY_MANAGEMENT)}
                            </h1>
                            {/* <button
                                className='group p-2 text-sm text-cyan-500 font-medium hover:underline disabled:hover:no-underline flex items-center gap-1'
                                disabled={isClickReadAll}
                                onClick={handleReadAll}
                                ref={readAllRef}
                            >
                                {isClickReadAll && <img src={Waiting} className='h-6 w-6' />}
                                <span className='group-disabled:opacity-50 '>Đã xem tất cả</span>
                            </button> */}
                        </div>
                        <div className='max-h-[85vh] overflow-auto' ref={parentRef}>
                            {notify.map((data) => (
                                <NotificationItem
                                    key={data._id}
                                    data={data}
                                    onItemRead={handleItemRead}
                                    onReadDetail={handleReadDetail}
                                />
                            ))}
                            {loading ? (
                                <SkeletonNotify />
                            ) : (
                                hasNextPage && <Waypoint onEnter={getMore} bottomOffset='-20%' />
                            )}
                        </div>
                    </>
                )}
            </Menu.Items>
        </Menu>
    )
}

export default Notification
