import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimateWrap, PaperWrap } from '~/components'
import LoadingWait from '~/components/Loading/LoadingWait'
import useFeedback from '../../hook/useFeedback'
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
    const { feedbacks } = useFeedback()
    const [searchParams] = useSearchParams()
    const feedbackId = searchParams.get(FEEDBACK_PARAM)

    return (
        <PaperWrap className='flex-1 sm:m-0' disabledPadding>
            <div className='h-full text-gray-900 dark:text-slate-200 sm:py-4 lg:w-80'>
                <LoadingWait loading={feedbacks.loading} className='my-4 ml-4 sm:my-0' />
                <AnimateWrap className='flex h-full flex-col gap-4 overflow-auto'>
                    {feedbacks.data?.map((feedback) => {
                        const { user, message, _id } = feedback
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
                            />
                        )
                    })}
                </AnimateWrap>
            </div>
        </PaperWrap>
    )
}

export default Users
