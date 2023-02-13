import { ArrowPathIcon, ArrowUpOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UploadImageCoreProps } from '~/@types/components'
import { useFilePreview } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const Core: React.FC<UploadImageCoreProps> = ({ image, clearImage, loading, id }) => {
    const { t } = useTranslation()
    const preview = useFilePreview()
    const handleClickImage = () => {
        preview({
            type: 'image',
            file: image,
        })
    }

    return (
        <>
            {image ? (
                <div
                    className={clsx('relative flex items-end gap-4 border dark:border-slate-700 rounded-md p-4', {
                        'animate-pulse cursor-wait': loading,
                    })}
                >
                    <img
                        className='w-32 h-32 border bg-white rounded-md object-cover cursor-pointer hover:opacity-70 transition-opacity'
                        src={image}
                        alt='#image'
                        onClick={handleClickImage}
                    />
                    <label
                        htmlFor={id}
                        className={clsx(
                            'py-3 px-10 truncate flex justify-center items-center rounded-md bg-radical-red-500 text-white font-medium hover:bg-radical-red-700 transition-colors',
                            loading ? 'cursor-wait' : 'cursor-pointer'
                        )}
                    >
                        {loading ? (
                            <>
                                <ArrowPathIcon className='h-5 w-5 -ml-5 mr-2 animate-spin' />
                                {t(LANGUAGE.LOADING_IMAGE)}
                            </>
                        ) : (
                            <>
                                <ArrowUpOnSquareIcon className='h-5 w-5 -ml-5 mr-2' />
                                {t(LANGUAGE.UPLOAD_IMAGE)}
                            </>
                        )}
                    </label>
                    <XMarkIcon
                        className={clsx(
                            'h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-slate-500 dark:hover:text-slate-400 absolute top-2 right-2',
                            loading ? 'cursor-wait' : 'cursor-pointer'
                        )}
                        onClick={() => !loading && clearImage()}
                    />
                </div>
            ) : (
                <>
                    <label
                        htmlFor={id}
                        className={clsx(
                            'text-gray-400 hover:text-gray-700 transition-colors hover:border-gray-700 dark:hover:text-slate-300 dark:hover:border-slate-300 cursor-pointer flex flex-col items-center justify-center gap-2 p-2 h-40 w-full rounded-md border border-dashed border-gray-300 shadow-sm font-light disabled:bg-gray-100 disabled:text-gray-400',
                            { 'animate-pulse': loading }
                        )}
                    >
                        {loading ? (
                            <>
                                <ArrowPathIcon className='h-10 w-10 animate-spin' />
                                <span>{t(LANGUAGE.LOADING_IMAGE)}</span>
                            </>
                        ) : (
                            <>
                                <ArrowUpOnSquareIcon className='h-10 w-10' />
                                <span>{t(LANGUAGE.PRESS_TO_UPLOAD_IMAGE)}</span>
                                <span className='text-xs'>(JPG, JPEG, PNG - {t(LANGUAGE.L_MAXIMUM)} 20MB)</span>
                            </>
                        )}
                    </label>
                </>
            )}
        </>
    )
}

export default Core
