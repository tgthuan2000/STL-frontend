import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatInfoItemProps } from '~/@types/feedback'
import { Image } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { getSpacingTime } from '~/services'
import { useProfile } from '~/store/auth'
import InputForm from './InputForm'

const ChatInfoItem: React.FC<ChatInfoItemProps> = ({
    data,
    lastEl,
    onReply,
    onEdit,
    onDelete,
    bottomImageLine,
    children,
}) => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const [showInput, setShowInput] = useState({
        show: false,
        isEdit: false,
        message: '',
    })
    const handleSubmitForm = (message: string) => {
        message = message.trim()
        if (data._id && message) {
            if (showInput.isEdit) {
                if (message !== data.message) {
                    onEdit(message, data._id)
                }
            } else {
                onReply(message, data._id)
            }
            setShowInput({
                show: false,
                isEdit: false,
                message: '',
            })
        }
    }

    return (
        <div className='relative'>
            <div className='inline-flex gap-2 items-start pt-10'>
                <div className='flex-shrink-0'>
                    <Image className='sm:!h-10 sm:!w-10 !h-8 !w-8' src={data.user.image} />
                </div>
                <div className='flex-1 relative'>
                    <div className='relative inline-flex flex-col sm:max-w-[60vw] max-w-[70vw] dark:bg-slate-700 bg-gray-100 p-2 rounded'>
                        <h3 className='font-normal select-none'>{data.user.userName}</h3>
                        <p className='whitespace-pre-line'>{data.message.trim()}</p>
                        {data.edited && (
                            <span className='text-gray-500 dark:text-slate-500 italic text-xs text-right mt-1'>
                                {t(LANGUAGE.EDITED)}
                            </span>
                        )}
                    </div>
                    <div className='mt-2 flex items-center gap-2'>
                        <span className='text-xs whitespace-nowrap text-gray-500 dark:text-slate-400 select-none'>
                            {getSpacingTime(data._createdAt)}
                        </span>
                        <button
                            type='button'
                            disabled={showInput.show && showInput.isEdit}
                            className='text-orange-500 dark:text-orange-400 transition-all dark:disabled:text-slate-600 disabled:text-slate-600 disabled:cursor-not-allowed hover:opacity-70 cursor-pointer font-normal whitespace-nowrap'
                            onClick={() =>
                                setShowInput({
                                    show: true,
                                    isEdit: false,
                                    message: '',
                                })
                            }
                        >
                            {t(LANGUAGE.REPLY)}
                        </button>
                        {userProfile?._id === data.user._id && (
                            <>
                                <button
                                    type='button'
                                    disabled={showInput.show && !showInput.isEdit}
                                    className='text-cyan-600 dark:text-cyan-500 transition-all dark:disabled:text-slate-600 disabled:text-slate-600 disabled:cursor-not-allowed hover:opacity-70 cursor-pointer font-normal whitespace-nowrap'
                                    onClick={() =>
                                        setShowInput({
                                            show: true,
                                            isEdit: true,
                                            message: data.message,
                                        })
                                    }
                                >
                                    {t(LANGUAGE.EDIT)}
                                </button>
                                {/* Disappear if distant time over 5 minutes */}
                                {}
                                {Date.now() - new Date(data._createdAt).getTime() < 5 * 60 * 1000 && (
                                    <button
                                        type='button'
                                        className='text-red-500 hover:opacity-70 cursor-pointer font-normal whitespace-nowrap'
                                        onClick={() => {
                                            if (!window.confirm(t(LANGUAGE.CONFIRM_DELETE_MESSAGE) as string)) return
                                            data._id && onDelete(data._id)
                                        }}
                                    >
                                        {t(LANGUAGE.DELETE)}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    {bottomImageLine && (
                        <>
                            <span className='bottom-image' />
                        </>
                    )}
                    {showInput.show && (
                        <div className='mt-2 inline-flex items-center gap-2'>
                            <InputForm onSubmit={handleSubmitForm} defaultMessage={showInput.message} />
                            <button
                                type='button'
                                className='font-normal text-radical-red-500 hover:opacity-70 whitespace-nowrap'
                                onClick={() =>
                                    setShowInput({
                                        show: false,
                                        isEdit: false,
                                        message: '',
                                    })
                                }
                            >
                                {t(LANGUAGE.CANCEL)}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {!!data.parentId && (
                <>
                    <span className='left-image' />
                </>
            )}
            {lastEl && (
                <>
                    <span className='bottom-left-image' />
                </>
            )}
            {children}
        </div>
    )
}

export default ChatInfoItem
