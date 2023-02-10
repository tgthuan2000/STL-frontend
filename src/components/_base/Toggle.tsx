import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import { ToggleProps } from '~/@types/components'
import ErrorMessage from '../ErrorMessage'

const Toggle = forwardRef<HTMLElement, ToggleProps>(({ label, form, name, rules, disabled }, ref) => {
    return (
        <div>
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <div className='inline-flex items-center gap-2'>
                            <Switch
                                checked={field.value}
                                className={clsx(
                                    field.value ? 'bg-indigo-600 dark:bg-sky-500' : 'bg-gray-200 dark:bg-slate-700',
                                    'relative inline-flex h-6 w-11 items-center rounded-full transition-all'
                                )}
                                disabled={disabled}
                                {...field}
                            >
                                <span
                                    className={clsx(
                                        field.value ? 'translate-x-6' : 'translate-x-1',
                                        'inline-block h-4 w-4 transform rounded-full bg-white transition-all'
                                    )}
                                />
                            </Switch>
                            <span className='text-gray-900 dark:text-slate-200'>{label}</span>
                        </div>
                        <ErrorMessage error={error} />
                    </>
                )}
            />
        </div>
    )
})

export default Toggle
