import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CameraIcon, HashtagIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import ImageResize from 'quill-image-resize-module-react'
import React, { useId, useState } from 'react'
import { Controller } from 'react-hook-form'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RichTextProps } from '~/@types/components'
import AnimateWrap from '~/components/AnimateWrap'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import { reactQuillOptions } from '~/constant/component'
import './index.css'
import Prose from '~/components/Prose'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

Quill.register('modules/imageResize', ImageResize)
Quill.register(Quill.import('attributors/style/direction'), true)
Quill.register(Quill.import('attributors/style/align'), true)

const RichText: React.FC<RichTextProps> = ({
    name,
    form,
    label,
    className,
    rules,
    disabled,
    placeholder,
    ...props
}) => {
    const id = useId()
    const { t } = useTranslation()
    const [showPreview, setShowPreview] = useState(false)
    const [ref] = useAutoAnimate<HTMLButtonElement>()

    const IconPreview = showPreview ? HashtagIcon : CameraIcon

    const togglePreview = () => {
        setShowPreview((prev) => !prev)
    }

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <div className='flex items-center justify-between'>
                        <Label id={id} label={label} />
                        <button
                            ref={ref}
                            type='button'
                            className='inline-flex h-5 w-5 cursor-pointer items-center justify-center text-gray-900 hover:opacity-70 dark:text-slate-200'
                            onClick={togglePreview}
                        >
                            <IconPreview className='h-full w-full' title={t(LANGUAGE.PREVIEW) as string} />
                        </button>
                    </div>
                    <AnimateWrap className='mt-1'>
                        {showPreview ? (
                            <div className='block w-full rounded-md border border-gray-300 bg-white p-2 font-light shadow-sm dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200'>
                                <Prose>{field.value}</Prose>
                            </div>
                        ) : (
                            <ReactQuill
                                id={id}
                                theme='snow'
                                className={clsx(
                                    'block w-full rounded-md border border-gray-300 font-light shadow-sm dark:border-slate-800',
                                    disabled
                                        ? 'cursor-not-allowed select-none bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-400'
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200'
                                )}
                                readOnly={disabled}
                                placeholder={placeholder as string}
                                {...reactQuillOptions}
                                {...field}
                                {...props}
                            />
                        )}
                    </AnimateWrap>
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
}

export default RichText
