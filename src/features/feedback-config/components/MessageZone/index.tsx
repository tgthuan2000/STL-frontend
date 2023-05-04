import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { List } from '~/@types'
import { Feedback } from '~/@types/feedback'
import { AnimateWrap } from '~/components'
import LoadingWait from '~/components/Loading/LoadingWait'
import { Messages } from '~/features/feedback/components'
import useActionFeedback from '~/features/feedback/hook/useActionFeedback'
import LANGUAGE from '~/i18n/language/key'
import { FEEDBACK_PARAM } from '../../pages/Dashboard'
import messageZoneHOC from './hoc'

export interface MessageZoneProps {
    data: List<Feedback>[] | undefined
    loading: boolean
    seeMoreClick: (parentId: string) => void
    onGetParent: (parentId: string) => void
}

const MessageZone: React.FC<MessageZoneProps> = (props) => {
    const { data, loading, seeMoreClick, onGetParent } = props
    const { t } = useTranslation()
    const { deleteMessage, editMessage, replyMessage } = useActionFeedback()
    const [searchParams] = useSearchParams()
    const feedbackId = searchParams.get(FEEDBACK_PARAM)

    return (
        <div className='relative h-full p-4 text-gray-900 dark:text-slate-200'>
            <AnimateWrap className='flex h-full flex-col'>
                {!feedbackId && (
                    <div className='flex flex-1 items-center justify-center'>
                        <p className='text-lg sm:text-xl'>{t(LANGUAGE.CHOOSE_FEEDBACK_USER)}</p>
                    </div>
                )}
                {!isEmpty(data) && (
                    <div className='flex-1 overflow-auto px-3 pb-10 sm:pl-10 sm:pt-10'>
                        <Messages
                            data={data}
                            onSeeMoreClick={seeMoreClick}
                            onReply={replyMessage}
                            onEdit={editMessage}
                            onDelete={deleteMessage}
                            onGetParent={onGetParent}
                        />
                    </div>
                )}
            </AnimateWrap>
            <LoadingWait loading={loading} className='absolute top-3 right-3 z-10' />
        </div>
    )
}

export default messageZoneHOC(MessageZone)
