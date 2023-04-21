import ImageResize from 'quill-image-resize-module-react'
import React, { useId } from 'react'
import { Controller } from 'react-hook-form'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RichTextProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import { reactQuillOptions } from '~/constant/component'
import './index.css'
import clsx from 'clsx'

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
    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <Label id={id} label={label} />
                    <div className='mt-1'>
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
                    </div>
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
}

export default RichText
