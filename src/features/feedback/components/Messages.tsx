import { get, isEmpty } from 'lodash'
import React, { useMemo } from 'react'
import { List } from '~/@types'
import { Feedback, MessagesProps } from '~/@types/feedback'
import { listToTree } from '~/services'
import ChatInfoItem from './ChatInfoItem'
import './message.css'
import SeeMoreButton from './SeeMoreButton'

const Messages: React.FC<MessagesProps> = ({ data, onSeeMoreClick, onReply, onEdit, onDelete }) => {
    const memo = useMemo(() => {
        if (!data) return null
        const _d = listToTree<Feedback>(data)

        const callBack = (data: Array<List<Feedback>>) => {
            return data.map((d, index, origin) => {
                const replyNum = d.childNum - (d.children?.filter((data) => get(data, 'status') !== 'new').length || 0)
                const lastEl = index !== origin.length - 1 && !!d.parentId

                return (
                    <div key={d._id} className='flex flex-col items-start'>
                        <ChatInfoItem
                            data={d}
                            lastEl={lastEl}
                            onReply={onReply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            bottomImageLine={!isEmpty(d.children) || replyNum > 0}
                        />
                        <div className='relative pl-10'>
                            {d.children && !isEmpty(d.children) && (
                                <>
                                    {callBack(d.children)}
                                    {lastEl && (
                                        <>
                                            <span className='bottom-bottom-left-image' />
                                        </>
                                    )}
                                </>
                            )}
                            {replyNum > 0 && (
                                <div className=''>
                                    <SeeMoreButton replyNum={replyNum} onClick={() => onSeeMoreClick(d._id)} />
                                    <span className='see-more-vertical' />
                                    <span className='see-more-horizontal' />
                                    {lastEl && <span className='see-more-vertical-left-image' />}
                                </div>
                            )}
                        </div>
                    </div>
                )
            })
        }
        return callBack(_d)
    }, [data])

    return <div className='text-gray-900 dark:text-slate-200'>{memo}</div>
}

export default Messages
