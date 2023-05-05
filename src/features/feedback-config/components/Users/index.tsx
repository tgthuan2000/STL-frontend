import { isEmpty } from 'lodash'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AnimateWrap, PaperWrap } from '~/components'
import LoadingWait from '~/components/Loading/LoadingWait'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import useTopFeedback from '../../hook/useTopFeedback'
import { FEEDBACK_PARAM } from '../../pages/Dashboard'
import User from './User'
import { Transaction } from '@sanity/client'

interface Props {}

const getUrl = (id: string, searchParams: URLSearchParams) => {
    const url = new URLSearchParams(searchParams)
    if (id === null) {
        url.delete(FEEDBACK_PARAM)
    } else {
        url.set(FEEDBACK_PARAM, id)
    }
    return `?${url.toString()}`
}

const Users: React.FC<Props> = () => {
    const { feedbacks, refetch } = useTopFeedback()
    const [searchParams, setSearchParams] = useSearchParams()
    const feedbackId = searchParams.get(FEEDBACK_PARAM)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const transaction = useRef<Transaction | null>(null)

    const handleResponseClick = (id: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (!transaction.current) {
            transaction.current = client.transaction()
        }

        const patch = client.patch(id, { set: { responded: true } })
        transaction.current.patch(patch)

        timeoutRef.current = setTimeout(async () => {
            try {
                await transaction.current?.commit()

                const url = new URLSearchParams(searchParams)
                if (url.get(FEEDBACK_PARAM)) {
                    url.delete(FEEDBACK_PARAM)
                    setSearchParams(url)
                }

                refetch()
                transaction.current = null
                timeoutRef.current = null
            } catch (error: any) {
                console.log(error)
                toast.error<string>(error.message)
            }
        }, 800)
    }

    return (
        <PaperWrap className='flex-1 sm:m-0' disabledPadding>
            <div className='relative h-full text-gray-900 dark:text-slate-200 sm:py-4 lg:w-80'>
                <LoadingWait loading={feedbacks.loading} className='absolute top-5 right-5' />
                <AnimateWrap className='flex h-full flex-col overflow-auto'>
                    {feedbacks.data?.data.map((feedback) => {
                        const { user, message, _id, _createdAt, edited } = feedback
                        const { email, image, userName } = user
                        const url = getUrl(_id, searchParams)
                        const isActive = feedbackId === _id

                        return (
                            <User
                                key={_id}
                                id={_id}
                                url={url}
                                email={email}
                                image={image}
                                isActive={isActive}
                                message={message}
                                userName={userName}
                                createdAt={_createdAt}
                                edited={edited}
                                onResponseClick={handleResponseClick}
                            />
                        )
                    })}

                    <EmptyFeedback show={!feedbacks.loading && isEmpty(feedbacks.data?.data)} />
                </AnimateWrap>
            </div>
        </PaperWrap>
    )
}

const EmptyFeedback = (props: { show: boolean }) => {
    const { show } = props
    const { t } = useTranslation()

    if (!show) return <></>

    return (
        <div className='flex h-full w-full items-center justify-center'>
            <p className='text-base sm:text-lg'>{t(LANGUAGE.EMPTY_DATA)}</p>
        </div>
    )
}

export default Users
