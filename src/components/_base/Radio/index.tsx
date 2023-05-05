import clsx from 'clsx'
import { DefaultTFuncReturn } from 'i18next'
import { forwardRef } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import AnimateWrap from '~/components/AnimateWrap'
import CheckButton from '~/components/CheckButton'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import LoadingText from '~/components/Loading/LoadingText'

interface Props {
    name: string
    form: UseFormReturn<any, object>
    className?: string
    options: any[] | undefined
    loading?: boolean
    label?: DefaultTFuncReturn
    getOptionKey: (option: any) => string
    getOptionLabel: (option: any) => string
}

const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { name, label, form, className, options, loading, getOptionKey, getOptionLabel } = props

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx('flex flex-col', className)}>
                    <div className='flex items-center justify-between'>
                        <Label label={label} />
                    </div>
                    <AnimateWrap className='mt-1 grid grid-cols-2 gap-2'>
                        {loading ? (
                            <LoadingText />
                        ) : (
                            options?.map((option) => {
                                const key = getOptionKey(option)
                                const label = getOptionLabel(option)
                                const checked = key === getOptionKey(field.value)

                                return (
                                    <CheckButton
                                        key={key}
                                        className='flex w-full items-center gap-1'
                                        value={key}
                                        checked={checked}
                                        onChange={() => field.onChange(option)}
                                        label={label}
                                    />
                                )
                            })
                        )}
                    </AnimateWrap>
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
})

export default Radio
