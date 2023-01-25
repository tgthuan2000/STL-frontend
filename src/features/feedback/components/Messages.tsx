import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React, { useMemo } from 'react'
import { List } from '~/@types'
import { IData, MessagesProps } from '~/@types/feedback'
import { listToTree } from '~/services'
import ChatInfoItem from './ChatInfoItem'
import './message.css'

const _data: IData[] = [
    {
        _id: '1',
        _createdAt: new Date(),
        parentId: null,
        message: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        `,
        childNum: 2,
        user: {
            _id: '1',
            userName: 'TGThuan',
            image: '',
        },
    },
    {
        _id: '10',
        _createdAt: new Date(),
        parentId: null,
        message: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        `,
        childNum: 0,
        user: {
            _id: '1',
            userName: 'TGThuan',
            image: '',
        },
    },
    {
        _id: '2',
        _createdAt: new Date(),
        parentId: '1',
        message: 'Hello 2',
        childNum: 3,
        user: {
            _id: '2',
            userName: 'TGThuan 2',
            image: '',
        },
    },
    {
        _id: '3',
        _createdAt: new Date(),
        parentId: '1',
        message: 'Hello 3',
        childNum: 1,
        user: {
            _id: '3',
            userName: 'TGThuan 3',
            image: '',
        },
    },
    {
        _id: '4',
        _createdAt: new Date(),
        parentId: '2',
        message: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        `,
        childNum: 1,
        user: {
            _id: '3',
            userName: 'TGThuan 3',
            image: '',
        },
    },
    {
        _id: '5',
        _createdAt: new Date(),
        parentId: '4',
        message: `Hello 4
        qweqweqw
        eqwe
        qweqw
        eqw
        eqw
        eqw
        e`,
        childNum: 0,
        user: {
            _id: '3',
            userName: `TGThuan 3`,
            image: '',
        },
    },
    {
        _id: '6',
        _createdAt: new Date(),
        parentId: '3',
        message: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        `,
        childNum: 0,
        user: {
            _id: '3',
            userName: 'TGThuan 3',
            image: '',
        },
    },
    {
        _id: '7',
        _createdAt: new Date(),
        parentId: '2',
        message: 'Hello 4a',
        childNum: 0,
        user: {
            _id: '3',
            userName: 'TGThuan 3',
            image: '',
        },
    },
    {
        _id: '8',
        _createdAt: new Date(),
        parentId: '2',
        message: `Hello 4
        asd
        asd
        asd
        asd
        as
        da
        sd
        asd
        asd
        asd
        asd
        `,
        childNum: 0,
        user: {
            _id: '3',
            userName: 'TGThuan 3',
            image: '',
        },
    },
]

const Messages: React.FC<MessagesProps> = ({ data = _data }) => {
    const memo = useMemo(() => {
        const _d = listToTree<IData>(data)
        const callBack = (data: Array<List<IData>>) => {
            return data.map((d, index, origin) => {
                const replyNum = d.childNum - (d.children?.length || 0)
                const bottomLine = index !== origin.length - 1 && !!d.parentId
                return (
                    <div key={d._id} className='flex flex-col items-start'>
                        <ChatInfoItem data={d} bottomLine={bottomLine} />
                        {d.children && !isEmpty(d.children) && (
                            <div className='relative pl-10'>
                                {callBack(d.children)}
                                {bottomLine && (
                                    <>
                                        <span className='bottom-bottom-left-image' />
                                    </>
                                )}
                                {replyNum > 0 && (
                                    <div className=''>
                                        <button
                                            type='button'
                                            className='pt-10 dark:text-cyan-400 text-cyan-500 hover:opacity-70'
                                        >
                                            Xem thêm {numeral(replyNum).format()} phản hồi
                                        </button>
                                        <span className='see-more-vertical' />
                                        <span className='see-more-horizontal' />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            })
        }
        return callBack(_d)
    }, [data])
    return <div className='text-gray-900 dark:text-slate-200'>{memo}</div>
}

export default Messages
