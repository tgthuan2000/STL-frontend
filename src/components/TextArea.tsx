import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { TextAreaProps } from '~/@types/components'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, label, name, error, ...props }, ref) => {
    const id = useId()
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div className={clsx(className)}>
            {label && (
                <label htmlFor={id} className='block font-medium text-gray-900'>
                    {label}
                </label>
            )}
            <div className='mt-1'>
                <textarea
                    id={id}
                    spellCheck={false}
                    autoComplete='off'
                    rows={6}
                    className='block p-2 w-full rounded-md border border-gray-300 shadow-sm font-light'
                    defaultValue=''
                    {...props}
                />
            </div>
            <div ref={parent}>{error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}</div>
        </div>
    )
})

export default TextArea
