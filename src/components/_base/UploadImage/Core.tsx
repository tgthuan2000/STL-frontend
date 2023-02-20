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
                    className={clsx('relative flex items-end gap-4 rounded-md border p-4 dark:border-slate-700', {
                        'animate-pulse cursor-wait': loading,
                    })}
                >
                    <img
                        className='h-32 w-32 cursor-pointer rounded-md border bg-white object-cover transition-opacity hover:opacity-70'
                        src={image}
                        alt='#image'
                        onClick={handleClickImage}
                    />
                    <label
                        htmlFor={id}
                        className={clsx(
                            'flex items-center justify-center truncate rounded-md bg-radical-red-500 py-3 px-10 font-medium text-white transition-colors hover:bg-radical-red-700',
                            loading ? 'cursor-wait' : 'cursor-pointer'
                        )}
                    >
                        {loading ? (
                            <>
                                <ArrowPathIcon className='-ml-5 mr-2 h-5 w-5 animate-spin' />
                                {t(LANGUAGE.LOADING_IMAGE)}
                            </>
                        ) : (
                            <>
                                <ArrowUpOnSquareIcon className='-ml-5 mr-2 h-5 w-5' />
                                {t(LANGUAGE.UPLOAD_IMAGE)}
                            </>
                        )}
                    </label>
                    <XMarkIcon
                        className={clsx(
                            'absolute top-2 right-2 h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-slate-500 dark:hover:text-slate-400',
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
                            'flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 p-2 font-light text-gray-400 shadow-sm transition-colors hover:border-gray-700 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 dark:hover:border-slate-300 dark:hover:text-slate-300',
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
