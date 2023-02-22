import { ArrowPathIcon, ArrowUpOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFilePreview } from '~/context'
import LANGUAGE from '~/i18n/language/key'

interface UploadedProps {
    id: string
    image: string
    loading: boolean
    onClearImage: () => void
}

const Uploaded: React.FC<UploadedProps> = ({ id, image, loading, onClearImage }) => {
    const { t } = useTranslation()
    const preview = useFilePreview()
    const handlePreviewImage = () => {
        preview({
            type: 'image',
            file: image,
        })
    }
    return (
        <div
            className={clsx('relative flex items-end gap-4 rounded-md border p-4 dark:border-slate-700', {
                'animate-pulse cursor-wait': loading,
            })}
        >
            <img
                className='h-32 w-32 cursor-pointer rounded-md border bg-white object-cover transition-opacity hover:opacity-70'
                src={image}
                alt='#image'
                onClick={handlePreviewImage}
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
                onClick={() => !loading && onClearImage()}
            />
        </div>
    )
}

export default Uploaded
