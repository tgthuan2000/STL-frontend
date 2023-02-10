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
                            className={disabled ? 'bg-gray-100 cursor-not-allowed select-none' : 'bg-white'}
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
