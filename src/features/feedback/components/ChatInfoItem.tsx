import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { ChatInfoItemProps } from '~/@types/feedback'
import { DATE_FORMAT } from '~/constant'
import InputForm from './InputForm'

const ChatInfoItem: React.FC<ChatInfoItemProps> = ({ data, bottomLine }) => {
    const [showInput, setShowInput] = useState(false)
    return (
        <div className='inline-flex gap-2 items-start pt-10 relative'>
            <div className='flex-shrink-0'>
                <div className='sm:h-10 h-8 sm:w-10 w-8 dark:bg-slate-600 bg-gray-400 rounded-full' />
            </div>
            <div className='flex-1'>
                <div className='relative inline-flex flex-col sm:max-w-[60vw] max-w-[70vw] dark:bg-slate-700 bg-gray-300 p-2 rounded'>
                    <h3 className='font-normal select-none'>{data.user.userName}</h3>
                    <p className='whitespace-pre-line'>{data.message.trim()}</p>
                </div>
                <div className='mt-2 flex items-center gap-2'>
                    <span className='text-xs whitespace-nowrap text-gray-400 dark:text-slate-400 select-none'>
                        {moment(data._createdAt).format(DATE_FORMAT.TIME_DATE)}
                    </span>
                    <button
                        type='button'
                        className='dark:text-orange-400 text-gray-500 hover:opacity-70 cursor-pointer whitespace-nowrap'
                        onClick={() => setShowInput(true)}
                    >
                        Phản hòi
                    </button>
                </div>
                {showInput && (
                    <div className='mt-2 inline-flex items-center gap-2'>
                        <InputForm />
                        <button
                            type='button'
                            className='font-normal text-radical-red-500 hover:opacity-70'
                            onClick={() => setShowInput(false)}
                        >
                            Hủy
                        </button>
                    </div>
                )}
            </div>

            {!isEmpty(data.children) && (
                <>
                    <span className='bottom-image' />
                </>
            )}
            {!!data.parentId && (
                <>
                    <span className='left-image' />
                    <span className={clsx('bottom-message', !bottomLine && 'rounded-bl-full')} />
                </>
            )}
            {bottomLine && (
                <>
                    <span className='bottom-left-image' />
                </>
            )}
        </div>
    )
}

export default ChatInfoItem
