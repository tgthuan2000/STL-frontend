import { useAutoAnimate } from '@formkit/auto-animate/react'
import ImageResize from 'quill-image-resize-module-react'
import React, { useId } from 'react'
import { Controller } from 'react-hook-form'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RichTextProps } from '~/@types/components'
import { reactQuillOptions } from '~/constant/component'
import './index.css'

Quill.register('modules/imageResize', ImageResize)
Quill.register(Quill.import('attributors/style/direction'), true)
Quill.register(Quill.import('attributors/style/align'), true)

const RichText: React.FC<RichTextProps> = ({ name, form, label, className, rules, disabled, ...props }) => {
    const id = useId()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    {label && (
                        <label htmlFor={id} className='inline-block font-medium text-gray-900'>
                            {label}
                        </label>
                    )}
                    <div className='mt-1'>
                        <ReactQuill
                            id={id}
                            theme='snow'
                            className={disabled ? 'bg-gray-100 cursor-not-allowed select-none' : 'bg-white'}
                            readOnly={disabled}
                            {...reactQuillOptions}
                            {...field}
                            {...props}
                        />
                    </div>
                    <div ref={parent}>
                        {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                    </div>
                </div>
            )}
        />
    )
}

export default RichText
