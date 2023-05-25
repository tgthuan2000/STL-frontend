import clsx from 'clsx'
import { DefaultTFuncReturn } from 'i18next'
import { forwardRef } from 'react'
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form'
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

const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { name, label, form, className, options, loading, getOptionKey, getOptionLabel } = props

    const handleChange = (field: ControllerRenderProps<any, string>, option: any) => {
        const values = form.getValues(name)
        const index = values?.findIndex((value: any) => getOptionKey(option) === getOptionKey(value)) ?? -1
        if (index !== -1) {
            const newValues = structuredClone(values)
            newValues.splice(index, 1)
            field.onChange(newValues)
        } else {
            field.onChange([...values, option])
        }
    }

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx('flex flex-col', className)}>
                    <div className='flex items-center justify-between'>
                        <Label label={label} />
                    </div>
                    <AnimateWrap className='mt-1 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2'>
                        {loading ? (
                            <LoadingText />
                        ) : (
                            <>
                                {options?.map((option) => {
                                    const key = getOptionKey(option)
                                    const label = getOptionLabel(option)
                                    const checked = !!field.value?.find((v: any) => key === getOptionKey(v))
                                    return (
                                        <CheckButton
                                            type='checkbox'
                                            key={key}
                                            className='flex w-full items-center gap-1'
                                            value={key}
                                            checked={checked}
                                            onChange={() => handleChange(field, option)}
                                            label={label}
                                        />
                                    )
                                })}
                            </>
                        )}
                    </AnimateWrap>
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
})

export default Checkbox
