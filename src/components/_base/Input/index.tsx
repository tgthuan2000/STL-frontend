import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { Controller } from 'react-hook-form'
import { InputProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import NumberHint from './NumberHint'

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, name, form, tracking, rules, type, ...props }, ref) => {
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
                            <input
                                id={id}
                                type={type}
                                spellCheck={false}
                                autoComplete='off'
                                className='block p-2 w-full rounded-md border border-gray-300 shadow-sm font-light disabled:bg-gray-100 disabled:text-gray-400 bg-white dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-400'
                                {...field}
                                onBlur={() => {
                                    field.onBlur()
                                    tracking?.(name)
                                }}
                                {...props}
                            />
                        </div>
                        {type === 'number' && <NumberHint field={field} />}
                        <ErrorMessage error={error} />
                    </div>
                )}
            />
        )
    }
)

export default Input
