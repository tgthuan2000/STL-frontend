import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { Controller } from 'react-hook-form'
import { TextAreaProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, form, rules, label, name }, ref) => {
    const id = useId()

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    <Label id={id} label={label} />
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
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
})

export default TextArea
