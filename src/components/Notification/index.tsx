import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { ItemReadEvent, NotificationProps, ReadDetailEvent } from '~/@types/components'
import BellIcon from '~/assets/notification.gif'
import { TEMPLATE } from '~/constant/template'
import { useNotify } from '~/context'
import { useWindowSize } from '~/hook'
import EmptyNotify from './Empty'
import NotificationItem from './Item'
import SkeletonNotify from './Skeleton'

const Notification: React.FC<NotificationProps> = () => {
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
        <Menu as='div' className='mr-3 relative inline-block'>
            <Menu.Button className='px-2 pt-1 group'>
                <div className='relative' ref={notifyRef}>
                    <img src={BellIcon} className='h-8 w-8 rounded' />
                    <span className='absolute -top-3 -right-3 bg-radical-red-500 dark:bg-prussian-blue-400 text-white rounded-full h-[22px] w-[22px] text-xs inline-flex justify-center items-center'>
                        {total > 99 ? '99+' : total}
                    </span>
                    {loadNewNotify && (
                        <span
                            className={clsx(
                                'absolute top-1/2 right-10 bg-radical-red-500 dark:bg-prussian-blue-400 text-white rounded-lg text-xs font-medium inline-flex justify-center items-center whitespace-nowrap p-2'
                            )}
                        >
                            {TEMPLATE.NEW_NOTIFY}
                        </span>
                    )}
                </div>
            </Menu.Button>

            <Menu.Items
                className={clsx(
                    'absolute right-0 sm:w-[500px] w-[320px] mt-2 select-none whitespace-nowrap origin-top-left divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-800 dark:divide-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none'
                )}
            >
                {isEmpty(notify) ? (
                    <EmptyNotify />
                ) : (
                    <>
                        <div className='flex justify-between'>
                            <h1 className='p-2 font-medium text-base text-gray-900 dark:text-white'>Thông báo</h1>
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
