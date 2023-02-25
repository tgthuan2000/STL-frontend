import { filter, get, isEmpty } from 'lodash'
import React, { useMemo } from 'react'
import { List } from '~/@types'
import { Feedback, MessagesProps } from '~/@types/feedback'
import { service } from '~/services'
import ChatInfoItem from './ChatInfoItem'
import './message.css'
import SeeMoreButton from './SeeMoreButton'

const Messages: React.FC<MessagesProps> = ({ data, onSeeMoreClick, onReply, onEdit, onDelete }) => {
    const memo = useMemo(() => {
        if (!data) return null
        const _d = service.listToTree<Feedback>(data)

        const callBack = (data: Array<List<Feedback>>, parentReplyNum: number) => {
            return data
                .filter((d) => !d.deleted)
                .map((d, index, origin) => {
                    const replyNum =
                        d.childNum - (d.children?.filter((data) => get(data, 'status') !== 'new').length || 0)
                    const lastEl = !!d.parentId && (index !== origin.length - 1 || parentReplyNum > 0)

                    return (
                        <div key={d._id} className='flex flex-col items-start'>
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
        return callBack(_d, 0)
    }, [data])

    return <div className='text-gray-900 dark:text-slate-200'>{memo}</div>
}

export default Messages
