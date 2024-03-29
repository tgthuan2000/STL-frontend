import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { AnimateWrap, Paper } from '~/components'
import LoadingWait from '~/components/Loading/LoadingWait'
import { useTDF } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import useTopFeedback from '../../hook/useTopFeedback'
import { FEEDBACK_PARAM } from '../../pages/Dashboard'
import User from './User'

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
    const responseClick = useTDF<{ id: string }>((transaction, params) => {
        const { id } = params
        const patch = client.patch(id, { set: { responded: true } })
        transaction.patch(patch)

        const commit = () => transaction.commit()

        const resolved = () => {
            const url = new URLSearchParams(searchParams)
            if (url.get(FEEDBACK_PARAM)) {
                url.delete(FEEDBACK_PARAM)
                setSearchParams(url)
            }

            refetch()
        }

        return { commit, resolved }
    }, 800)

    return (
        <Paper className='flex-1' disabledPadding>
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
                                onResponseClick={responseClick}
                            />
                        )
                    })}

                    <EmptyFeedback show={!feedbacks.loading && isEmpty(feedbacks.data?.data)} />
                </AnimateWrap>
            </div>
        </Paper>
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
