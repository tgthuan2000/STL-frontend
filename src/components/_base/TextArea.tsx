import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { Controller } from 'react-hook-form'
import { TextAreaProps } from '~/@types/components'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, form, rules, label, name }, ref) => {
    const id = useId()
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    {label && (
                        <label htmlFor={id} className='inline-block font-medium text-gray-900 dark:text-slate-100'>
                            {label}
                        </label>
                    )}
                    <div className='mt-1'>
                        <textarea
                            id={id}
                            spellCheck={false}
                            autoComplete='off'
                            rows={6}
                            className='block p-2 w-full rounded-md border border-gray-300 shadow-sm font-light bg-white dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200'
                            {...field}
                        />
                    </div>
                    <div ref={parent}>
                        {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                    </div>
                </div>
            )}
        />
    )
})

export default TextArea
