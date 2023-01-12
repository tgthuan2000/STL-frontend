import { useAutoAnimate } from '@formkit/auto-animate/react'
import React, { useId } from 'react'
import { Controller } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RichTextProps } from '~/@types/components'
import { toolbarRichText } from '~/constant/component'
import './index.css'

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
                            modules={{ toolbar: toolbarRichText }}
                            className={disabled ? 'bg-gray-100 cursor-not-allowed select-none' : 'bg-white'}
                            readOnly={disabled}
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
