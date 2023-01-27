import clsx from 'clsx'
import React, { useState } from 'react'
import { ChatInfoItemProps } from '~/@types/feedback'
import { Image } from '~/components'
import { getSpacingTime } from '~/services'
import InputForm from './InputForm'

const ChatInfoItem: React.FC<ChatInfoItemProps> = ({ data, lastEl, onReply, bottomImageLine }) => {
    const [showInput, setShowInput] = useState(false)
    const handleSubmitForm = (message: string) => {
        message = message.trim()
        if (data._id && message) {
            onReply(message, data._id)
            setShowInput(false)
        }
    }

    return (
        <div className='inline-flex gap-2 items-start pt-10 relative'>
            <div className='flex-shrink-0'>
                <Image className='sm:!h-10 sm:!w-10 !h-8 !w-8' src={data.user.image} />
            </div>
            <div className='flex-1'>
                <div className='relative inline-flex flex-col sm:max-w-[60vw] max-w-[70vw] dark:bg-slate-700 bg-gray-100 p-2 rounded'>
                    <h3 className='font-normal select-none'>{data.user.userName}</h3>
                    <p className='whitespace-pre-line'>{data.message.trim()}</p>
                </div>
                <div className='mt-2 flex items-center gap-2'>
                    <span className='text-xs whitespace-nowrap text-gray-400 dark:text-slate-400 select-none'>
                        {getSpacingTime(data._createdAt)}
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
                        <InputForm onSubmit={handleSubmitForm} />
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

            {bottomImageLine && (
                <>
                    <span className='bottom-image' />
                </>
            )}
            {!!data.parentId && (
                <>
                    <span className='left-image' />
                    <span className={clsx('bottom-message', !lastEl && 'rounded-bl-full')} />
                </>
            )}
            {lastEl && (
                <>
                    <span className='bottom-left-image' />
                </>
            )}
        </div>
    )
}

export default ChatInfoItem
