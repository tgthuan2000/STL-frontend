import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import numeral from 'numeral'
import { forwardRef, useId } from 'react'
import { Controller } from 'react-hook-form'
import { InputProps } from '~/@types/components'

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, name, type = 'text', form, rules, disabled, ...props }, ref) => {
        const id = useId()
        const [parent] = useAutoAnimate<HTMLDivElement>()
        const [numberWrap] = useAutoAnimate<HTMLDivElement>()
        return (
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <div className={clsx(className)}>
                        {label && (
                            <label htmlFor={id} className='inline-block font-medium text-gray-900'>
                                {label}
                            </label>
                        )}
                        <div className='mt-1'>
                            <input
                                id={id}
                                type={type}
                                disabled={disabled}
                                spellCheck={false}
                                autoComplete='off'
                                className='block p-2 w-full rounded-md border border-gray-300 shadow-sm font-light disabled:bg-gray-100 disabled:text-gray-400'
                                {...field}
                                {...props}
                            />
                        </div>
                        {type === 'number' && (
                            <div ref={numberWrap} className='pl-2 pt-1'>
                                {field.value && numeral(field.value).format()}
                            </div>
                        )}
                        <div ref={parent}>
                            {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                        </div>
                    </div>
                )}
            />
        )
    }
)

export default Input
