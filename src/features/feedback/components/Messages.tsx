import { filter, get, isEmpty } from 'lodash'
import numeral from 'numeral'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from '~/@types'
import { Feedback } from '~/@types/feedback'
import LANGUAGE from '~/i18n/language/key'
import ActionButton from './ActionButton'
import ChatInfoItem from './ChatInfoItem'
import './message.css'

export interface Props {
    data: List<Feedback>[] | undefined
    onSeeMoreClick: (parentId: string) => any
    onReply: (message: string, parentId: string) => any
    onEdit: (message: string, id: string) => any
    onDelete: (id: string) => any
    onGetParent?: (id: string) => any
}

const Messages: React.FC<Props> = (props) => {
    const { data, onSeeMoreClick, onReply, onEdit, onDelete, onGetParent } = props
    const memo = useMemo(() => {
        if (!data) return null

        const callBack = (data: Array<List<Feedback>>, parentReplyNum: number) => {
            return data
                .filter((d) => !d.deleted)
                .map((d, index, origin) => {
                    const newMessageNum = d.children?.filter((data) => get(data, 'status') !== 'new').length || 0
                    const replyNum = d.childNum - newMessageNum
                    const lastEl = !!d.parent && (index !== origin.length - 1 || parentReplyNum > 0)

                    return (
                        <div key={d._id} className='flex flex-col items-start'>
                            {!!d.parent && !d.parentEl && (
                                <SeePrevious onClick={() => onGetParent?.(d.parent?._id as string)} />
                            )}

                            <ChatInfoItem
                                data={d}
                                lastEl={lastEl}
                                onReply={onReply}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                bottomImageLine={!isEmpty(filter(d.children, { deleted: false })) || replyNum > 0}
                            >
                                {d.children && !isEmpty(d.children) && (
                                    <div className='pl-10'>
                                        <>{callBack(d.children, replyNum)}</>
                                    </div>
                                )}
                                {replyNum > 0 && (
                                    <div className='pl-10'>
                                        <div className='relative'>
                                            <SeeMoreButton replyNum={replyNum} onClick={() => onSeeMoreClick(d._id)} />
                                            <span className='left-see-more' />
                                        </div>
                                    </div>
                                )}
                            </ChatInfoItem>
                        </div>
                    )
                })
        }
        return callBack(data, 0)
    }, [data])

    return <div className='text-gray-900 dark:text-slate-200'>{memo}</div>
}

interface SeeMoreButtonProps {
    replyNum: number
    onClick: () => void
}

const SeeMoreButton: React.FC<SeeMoreButtonProps> = (props) => {
    const { replyNum, onClick } = props
    const { t } = useTranslation()

    return (
        <ActionButton
            title={`${t(LANGUAGE.SEE_MORE)} ${numeral(replyNum).format()} ${t(LANGUAGE.L_REPLIES)}`}
            onClick={onClick}
        />
    )
}

interface SeePreviousProps {
    onClick: () => void
}

const SeePrevious: React.FC<SeePreviousProps> = (props) => {
    const { onClick } = props
    const { t } = useTranslation()

    return (
        <ActionButton
            className='-ml-5 pb-1 pt-0'
            title={`${t(LANGUAGE.SEE_MORE)} ${t(LANGUAGE.L_FEEDBACKS)}`}
            onClick={onClick}
        />
    )
}

export default Messages
