import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import { SanityDocument, Transaction } from '@sanity/client'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { ItemReadEvent, NotificationProps, ReadDetailEvent } from '~/@types/components'
import { NotifyItem, NotifyPaginate } from '~/@types/notify'
import Waiting from '~/assets/newtons-cradle.gif'
import BellIcon from '~/assets/notification.gif'
import { notifySound } from '~/constant/component'
import { TEMPLATE } from '~/constant/template'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_NOTIFY_PAGINATE, GET_NOTIFY_SUBSCRIPTION, SUBSCRIPTION_NOTIFY } from '~/schema/query/notify'
import useAuth from '~/store/auth'
import EmptyNotify from './Empty'
import NotificationItem from './Item'
import SkeletonNotify from './Skeleton'

const Notification: React.FC<NotificationProps> = () => {
    const { userProfile } = useAuth()
    const { width } = useWindowSize()
    const [parentRef] = useAutoAnimate<HTMLDivElement>()
    const [readAllRef] = useAutoAnimate<HTMLButtonElement>()
    const [notifyRef] = useAutoAnimate<HTMLDivElement>()
    const navigate = useNavigate()
    const [notify, setNotify] = useState<Array<SanityDocument<NotifyItem>>>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadNewNotify, setLoadNewNotify] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [isClickReadAll, setClickReadAll] = useState(false)
    const { setSubmitLoading } = useLoading()

    const fetch = useCallback(async (__fromNotify = 0, __toNotify = 10) => {
        setLoading(true)
        const data: NotifyPaginate = await client.fetch(GET_NOTIFY_PAGINATE, {
            userId: userProfile?._id,
            __fromNotify,
            __toNotify,
        })
        if (data) {
            const { notify, total, hasNextPage } = data
            setNotify((prev) => [...prev, ...notify])
            setTotal(total)
            setHasNextPage(hasNextPage)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        fetch()
    }, [fetch])

    useEffect(() => {
        const sub = client
            .listen<SanityDocument<NotifyItem>>(SUBSCRIPTION_NOTIFY, { userId: userProfile?._id })
            .subscribe((update) => {
                if (update.documentId.includes('drafts')) return
                if (update.result) {
                    const __ = update.result as SanityDocument<NotifyItem>
                    if (__.user._ref !== userProfile?._id) return

                    setTimeout(async () => {
                        try {
                            const data = await client.fetch<SanityDocument<NotifyItem>>(GET_NOTIFY_SUBSCRIPTION, {
                                notifyId: __._id,
                            })

                            if (data) {
                                switch (update.transition) {
                                    case 'update': {
                                        setNotify((prev) => {
                                            const index = prev.findIndex((item) => item._id === data._id)
                                            if (index > -1) {
                                                prev[index] = data
                                            }
                                            return prev
                                        })
                                        setTotal((prev) => (data.read ? prev - 1 : prev + 1))
                                        break
                                    }
                                    case 'appear': {
                                        setLoadNewNotify(true)
                                        setNotify((prev) => {
                                            prev.unshift(data)
                                            return prev
                                        })
                                        setTotal((prev) => prev + 1)
                                        setTimeout(() => {
                                            setLoadNewNotify(false)
                                        }, 3000)
                                        notifySound.play()
                                        break
                                    }
                                }
                            }
                        } catch (error) {
                            console.log(error)
                        } finally {
                        }
                    }, 1000)
                }
            })

        return () => {
            sub.unsubscribe()
        }
    }, [])

    const handleReadAll: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.stopPropagation()

        const notifyUnRead = notify.filter((item) => item.read === false)

        if (isEmpty(notifyUnRead)) return

        setClickReadAll(true)

        const __ = client.transaction()

        notifyUnRead.forEach((data) => {
            readNotify(__, data.notify._id, data._id)
        })
        await __.commit({ autoGenerateArrayKeys: true })
        setClickReadAll(false)
    }

    const readNotify = (__: Transaction, notifyId: string, notifyItemId: string) => {
        const patchNotify = client
            .patch(notifyId)
            .setIfMissing({ viewers: [] })
            .append('viewers', [{ _type: 'reference', _ref: userProfile?._id }])

        __.patch(patchNotify)
        __.patch(notifyItemId, { set: { read: true } })
    }

    const handleItemRead: ItemReadEvent = async (e, data) => {
        e.stopPropagation()
        e.preventDefault()

        if (data.read) return

        let __ = client.transaction()
        readNotify(__, data.notify._id, data._id)
        await __.commit({ autoGenerateArrayKeys: true })
    }

    const handleReadDetail: ReadDetailEvent = async (data) => {
        if (data.read === false) {
            setSubmitLoading(true)
            const __ = client.transaction()
            readNotify(__, data.notify._id, data._id)
            await __.commit({ autoGenerateArrayKeys: true })
            setSubmitLoading(false)
        }
        navigate(`/notify/${data.notify._id}`)
    }

    const handleGetMoreNotify = async () => {
        await fetch(notify.length, notify.length + 10)
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
                                'absolute bg-radical-red-500 dark:bg-prussian-blue-400 text-white rounded-lg text-xs font-medium inline-flex justify-center items-center whitespace-nowrap p-2',
                                { '-bottom-1/2 left-10': width >= 768 },
                                { 'top-1/2 right-10': width < 768 }
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
                        <div className='max-h-[60vh] overflow-auto' ref={parentRef}>
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
                                hasNextPage && <Waypoint onEnter={handleGetMoreNotify} bottomOffset='-20%' />
                            )}
                        </div>
                    </>
                )}
            </Menu.Items>
        </Menu>
    )
}

export default Notification
