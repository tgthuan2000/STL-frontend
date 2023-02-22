import { ArrowPathIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UploadBoxProps } from '~/@types/components'
import LANGUAGE from '~/i18n/language/key'

const UploadBox: React.FC<UploadBoxProps> = ({ id, loading, getRootProps, isDragActive }) => {
    const { t } = useTranslation()

    return (
        <>
            <label
                {...getRootProps()}
                htmlFor={id}
                className={clsx(
                    'flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md p-2 font-light text-gray-400 shadow-sm transition-colors disabled:bg-gray-100 disabled:text-gray-400 dark:hover:border-slate-300 dark:hover:text-slate-300',
                    { 'animate-pulse': loading },
                    !loading && isDragActive
                        ? 'animate-pulse border-2 border-solid border-cyan-500 hover:border-cyan-700 hover:text-cyan-700'
                        : 'border border-dashed border-gray-300 hover:border-gray-700 hover:text-gray-700'
                )}
            >
                {loading ? (
                    <>
                        <ArrowPathIcon className='h-10 w-10 animate-spin' />
                        <span>{t(LANGUAGE.LOADING_IMAGE)}</span>
                    </>
                ) : (
                    <>
                        <ArrowUpOnSquareIcon
                            className={clsx('h-10 w-10', {
                                'animate-bounce text-cyan-500': isDragActive,
                            })}
                        />
                        {isDragActive ? (
                            <>
                                <span className='font-medium text-cyan-500'>{t(LANGUAGE.DROP_IMAGE_HERE)}</span>
                            </>
                        ) : (
                            <>
                                <div className='flex flex-col items-center'>
                                    <span>{t(LANGUAGE.PRESS_TO_UPLOAD_IMAGE)}</span>
                                    <span className='text-xs'>{t(LANGUAGE.OR)}</span>
                                    <span>{t(LANGUAGE.DROP_IMAGE_HERE)}</span>
                                </div>
                                <span className='text-xs'>(JPG, JPEG, PNG - {t(LANGUAGE.L_MAXIMUM)} 20MB)</span>
                            </>
                        )}
                    </>
                )}
            </label>
        </>
    )
}

export default UploadBox
