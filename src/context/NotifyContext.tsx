import { SanityDocument, Transaction } from '@sanity/client'
import { isEmpty } from 'lodash'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { IUserProfile } from '~/@types/auth'
import { INotifyContext } from '~/@types/context'
import { AssignedNotify, ClientNotifyDataType, NotifyPaginate } from '~/@types/notify'
import { notifySound } from '~/constant/component'
import { client } from '~/sanityConfig'
import { GET_NOTIFY_PAGINATE, GET_NOTIFY_SUBSCRIPTION, SUBSCRIPTION_NOTIFY } from '~/schema/query/notify'
import { useProfile } from '~/store/auth'

const NotifyContext = createContext<INotifyContext>({
    notify: [],
    total: 0,
    loadNewNotify: false,
    hasNextPage: true,
    loading: false,
    fetch: async () => {},
    getMore: async () => {},
    readDetail: async () => '',
})

const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
    const { userProfile } = useProfile()
    const [notify, setNotify] = useState<AssignedNotify[]>([])
    const [total, setTotal] = useState(0)
    const [loadNewNotify, setLoadNewNotify] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loading, setLoading] = useState(false)
    const [clickReadAll, setClickReadAll] = useState(false)

    const fetch = useCallback(async (__fromNotify = 0, __toNotify = 15) => {
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

    const getMore = useCallback(async () => {
        await fetch(notify.length, notify.length + 10)
    }, [notify])

    const readNotify = (__: Transaction, notifyId: string, notifyItemId: string) => {
        const patchNotify = client
            .patch(notifyId)
            .setIfMissing({ viewers: [] })
            .append('viewers', [{ _type: 'reference', _ref: userProfile?._id }])

        __.patch(patchNotify)
        __.patch(notifyItemId, { set: { read: true } })
    }

    const readDetail = useCallback(async (data: ClientNotifyDataType) => {
        if (data.read === false) {
            const __ = client.transaction()
            readNotify(__, data.notify._id, data._id)
            await __.commit({ autoGenerateArrayKeys: true })
        }
        return `/notify/${data.notify._id}`
    }, [])

    const readAll: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
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
    }, [])

    useEffect(() => {
        fetch()
    }, [fetch])

    useEffect(() => {
        const sub = client
            .listen<SanityDocument<AssignedNotify>>(SUBSCRIPTION_NOTIFY, { userId: userProfile?._id })
            .subscribe((update) => {
                if (update.documentId.includes('drafts')) return

                console.log({ update })
                if (update.result) {
                    const __ = update.result as SanityDocument<
                        Omit<AssignedNotify, 'user'> & { user: IUserProfile & { _ref: string } }
                    >
                    if (__.user._ref !== userProfile?._id) return

                    setTimeout(async () => {
                        try {
                            const data = await client.fetch<SanityDocument<AssignedNotify>>(GET_NOTIFY_SUBSCRIPTION, {
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
                } else {
                    switch (update.transition) {
                        case 'disappear': {
                            setNotify((prev) => {
                                const index = prev.findIndex((item) => item._id === update.documentId)
                                if (index > -1) {
                                    prev.splice(index, 1)
                                }
                                return prev
                            })
                            setTotal((prev) => prev - 1)
                        }
                    }
                }
            })

        return () => {
            sub.unsubscribe()
        }
    }, [])

    const value: INotifyContext = {
        notify,
        total,
        loadNewNotify,
        hasNextPage,
        loading,
        fetch,
        getMore,
        readDetail,
    }

    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
}

const useNotify = () => {
    const context = useContext(NotifyContext)

    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider')
    }

    return context
}

export { useNotify, NotifyProvider }
