import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { forwardRef, useId, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import NumberHint from './NumberHint'
import { DefaultTFuncReturn } from 'i18next'
import { Rules, TrackingFunc } from '~/@types/components'
import AnimateWrap from '~/components/AnimateWrap'

export interface Props {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    type?: React.HTMLInputTypeAttribute
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
    autoFocus?: boolean
    numberHint?: boolean
    calculator?: boolean
    tracking?: TrackingFunc
    onChange?: (value: string) => void
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        className,
        label,
        name,
        form,
        tracking,
        onChange,
        rules,
        type,
        numberHint = true,
        calculator = true,
        ...rest
    } = props
    const id = useId()
    const [_type, setType] = useState(type)

    const onchange = (value: string, fieldChange: (...event: any[]) => void) => {
        fieldChange(value)
        onChange?.(value)
    }

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    <div className='flex items-center justify-between'>
                        <Label id={id} label={label} />
                    </div>
                    <div className={clsx('mt-1', { relative: type === 'password' })}>
                        <input
                            id={id}
                            type={_type}
                            spellCheck={false}
                            autoComplete='off'
                            className={clsx(
                                'block w-full rounded-md border border-gray-300 bg-white p-2 font-light shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-400',
                                { 'pr-8': type === 'password' }
                            )}
                            {...field}
                            onChange={(e) => onchange(e.target.value, field.onChange)}
                            onBlur={() => {
                                field.onBlur()
                                tracking?.(name)
                            }}
                            {...rest}
                        />
                        {type === 'password' && (
                            <button
                                type='button'
                                onClick={() => setType((prev) => (prev === 'text' ? 'password' : 'text'))}
                                className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 hover:opacity-70 focus:outline-none'
                            >
                                {_type === 'password' ? (
                                    <EyeIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                ) : (
                                    <EyeSlashIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                )}
                            </button>
                        )}
                    </div>
                    {type === 'number' && numberHint && <NumberHint field={field} />}
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
})

export default Input
