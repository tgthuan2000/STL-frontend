import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowPathIcon, ArrowUpOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { ChangeEvent, forwardRef, useId, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UploadImageProps } from '~/@types/components'
import { acceptImageType } from '~/constant/component'
import LANGUAGE from '~/i18n/language/key'
import { client, urlFor } from '~/sanityConfig'

const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
    ({ className, label, name, form, rules, disabled, ...props }, ref) => {
        const { t } = useTranslation()
        const id = useId()
        const [parent] = useAutoAnimate<HTMLDivElement>()
        const [loading, setLoading] = useState(false)

        const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                try {
                    setLoading(true)
                    if (!acceptImageType.includes(file.type)) {
                        form.setError(name, { message: `${t(LANGUAGE.INVALID_FORMAT_IMAGE)} (JPG, JPEG, PNG)` })
                        return
                    } else {
                        form.clearErrors(name)
                    }

                    if (file.size > 20 * 1024 ** 2) {
                        form.setError(name, { message: `${t(LANGUAGE.INVALID_FORMAT_IMAGE_SIZE)} (20MB)` })
                        return
                    } else {
                        form.clearErrors(name)
                    }

                    const data = await client.assets.upload('image', file)
                    form.setValue(name, data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }

        return (
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ fieldState: { error } }) => (
                    <div className={clsx(className)}>
                        {label && (
                            <label htmlFor={id} className='inline-block font-medium text-gray-900 dark:text-slate-100'>
                                {label}
                            </label>
                        )}
                        <div className='mt-1'>
                            {form.getValues(name) ? (
                                <div
                                    className={clsx(
                                        'relative flex items-end gap-4 border dark:border-slate-700 rounded-md p-4',
                                        {
                                            'animate-pulse cursor-wait': loading,
                                        }
                                    )}
                                >
                                    <img
                                        className='w-32 h-32 border bg-white rounded-md object-cover'
                                        src={urlFor(form.getValues(name))}
                                        alt='#image'
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
                                        onClick={() => !loading && form.setValue(name, null)}
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
                                                <span className='text-xs'>
                                                    (JPG, JPEG, PNG - {t(LANGUAGE.L_MAXIMUM)} 20MB)
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </>
                            )}
                        </div>
                        <div ref={parent}>
                            {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                        </div>
                        <input
                            id={id}
                            type='file'
                            accept='image/png, image/jpeg'
                            disabled={disabled || loading}
                            hidden
                            onChange={handleUploadFile}
                            {...props}
                        />
                    </div>
                )}
            />
        )
    }
)

export default UploadImage
