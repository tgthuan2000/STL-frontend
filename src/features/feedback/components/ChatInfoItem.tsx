import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatInfoItemProps } from '~/@types/feedback'
import { Image } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { useService } from '~/services'
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
    const { getSpacingTime } = useService()
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
            <div className='inline-flex items-start gap-2 pt-10'>
                <div className='flex-shrink-0'>
                    <Image className='!h-8 !w-8 sm:!h-10 sm:!w-10' src={data.user.image} />
                </div>
                <div className='relative flex-1'>
                    <div className='relative inline-flex max-w-[70vw] flex-col rounded bg-gray-100 p-2 dark:bg-slate-700 sm:max-w-[60vw]'>
                        <h3 className='select-none font-normal'>{data.user.userName}</h3>
                        <p className='whitespace-pre-line'>{data.message.trim()}</p>
                        {data.edited && (
                            <span className='mt-1 text-right text-xs italic text-gray-500 dark:text-slate-500'>
                                {t(LANGUAGE.EDITED)}
                            </span>
                        )}
                    </div>
                    <div className='mt-2 flex items-center gap-2'>
                        <span className='select-none whitespace-nowrap text-xs text-gray-500 dark:text-slate-400'>
                            {getSpacingTime(data._createdAt)}
                        </span>
                        <button
                            type='button'
                            disabled={showInput.show && showInput.isEdit}
                            className='cursor-pointer whitespace-nowrap font-normal text-orange-500 transition-all hover:opacity-70 disabled:cursor-not-allowed disabled:text-slate-600 dark:text-orange-400 dark:disabled:text-slate-600'
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
                                    className='cursor-pointer whitespace-nowrap font-normal text-cyan-600 transition-all hover:opacity-70 disabled:cursor-not-allowed disabled:text-slate-600 dark:text-cyan-500 dark:disabled:text-slate-600'
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
                                        className='cursor-pointer whitespace-nowrap font-normal text-red-500 hover:opacity-70'
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
                                className='whitespace-nowrap font-normal text-radical-red-500 hover:opacity-70'
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
