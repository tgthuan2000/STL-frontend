import React, { useId } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Controller } from 'react-hook-form'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { RichTextProps } from '~/@types/components'
import './index.css'

const toolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
]

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
                            modules={{ toolbar }}
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
