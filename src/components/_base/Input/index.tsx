import clsx from 'clsx'
import React, { forwardRef, Suspense, useId } from 'react'
import { Controller } from 'react-hook-form'
import { InputProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import LoadingText from '~/components/Loading/LoadingText'
import NumberHint from './NumberHint'

const Calculator = React.lazy(() => import('~/components/Calculator'))

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, name, form, tracking, rules, type, numberHint = true, calculator = true, ...props }, ref) => {
        const id = useId()

        const handleSubmitCalculator = (value: number, fieldChange: (...event: any[]) => void) => {
            if (type === 'number' && calculator && value) {
                fieldChange(value)
                // tracking?.(name)
            }
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
                            {/* {type === 'number' && calculator && (
                                <Suspense fallback={<LoadingText />}>
                                    <Calculator onSubmit={(value) => handleSubmitCalculator(value, field.onChange)} />
                                </Suspense>
                            )} */}
                        </div>
                        <div className='mt-1'>
                            <input
                                id={id}
                                type={type}
                                spellCheck={false}
                                autoComplete='off'
                                className='block w-full rounded-md border border-gray-300 bg-white p-2 font-light shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-400'
                                {...field}
                                onBlur={() => {
                                    field.onBlur()
                                    tracking?.(name)
                                }}
                                {...props}
                            />
                        </div>
                        {type === 'number' && numberHint && <NumberHint field={field} />}
                        <ErrorMessage error={error} />
                    </div>
                )}
            />
        )
    }
)

export default Input
