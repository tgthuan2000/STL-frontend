import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { Controller } from 'react-hook-form'
import { TextAreaProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, form, rules, label, name, tracking }, ref) => {
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
                                className='block w-full rounded-md border border-gray-300 bg-white p-2 font-light shadow-sm dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200'
                                {...field}
                                onBlur={() => {
                                    field.onBlur()
                                    tracking?.(name)
                                }}
                            />
                        </div>
                        <ErrorMessage error={error} />
                    </div>
                )}
            />
        )
    }
)

export default TextArea
