import { useCallback } from 'react'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

export interface replyMessageOption {
    message: string
    parentId: string
    feedbackForUser: string
    responded?: boolean
}

const useActionFeedback = () => {
    const { userProfile } = useProfile()

    const submitNewMessage = useCallback(async (message: string) => {
        if (!message) return

        const __ = client.transaction()
        __.create({
            _type: 'feedback',
            message,
            user: {
                _type: 'reference',
                _ref: userProfile?._id as string,
            },
            edited: false,
            deleted: false,
            responded: false,
        })

        await __.commit()
    }, [])

    const replyMessage = useCallback(async (options: replyMessageOption) => {
        const { feedbackForUser, message, parentId, responded = false } = options
        if (!parentId || !message) return

        const __ = client.transaction()
        __.create({
            _type: 'feedback',
            message,
            parent: {
                _type: 'reference',
                _ref: parentId,
            },
            edited: false,
            deleted: false,
            responded: responded,
            user: {
                _type: 'reference',
                _ref: userProfile?._id as string,
            },
            feedbackForUser: {
                _type: 'reference',
                _ref: feedbackForUser,
            },
        })

        await __.commit()
    }, [])

    const editMessage = useCallback(async (message: string, _id: string) => {
        if (!_id || !message) return

        const __ = client.transaction()

        __.patch(_id, {
            set: {
                message,
                edited: true,
            },
        })

        await __.commit()
    }, [])

    const deleteMessage = useCallback(async (_id: string) => {
        if (!_id) return

        const __ = client.transaction()
        __.patch(_id, {
            set: {
                deleted: true,
            },
        })
        await __.commit()
    }, [])

    return {
        submitNewMessage,
        replyMessage,
        editMessage,
        deleteMessage,
    }
}

export default useActionFeedback
