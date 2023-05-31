import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { DefaultTFuncReturn } from 'i18next'
import { filter, find, get, isEmpty, isNil } from 'lodash'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Rules, TrackingFunc } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import LANGUAGE from '~/i18n/language/key'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import Options from './Options'
import Surplus from './Surplus'

export interface Props {
    name: string
    className?: string
    label?: string | DefaultTFuncReturn
    data?: any[]
    idKey?: string
    valueKey?: string
    onReload?: () => Promise<void> | void
    addMore?: (value: any) => Promise<any>
    loading?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
    tracking?: TrackingFunc
    disabled?: boolean
    onChange?: (value: any) => void
    showImage?: boolean
    disabledClear?: boolean
    disabledShowSurplus?: boolean
    surplusName?: string | DefaultTFuncReturn
    multiple?: boolean
    EmptyOptionFallback?: React.ReactNode
}

const AutoComplete = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { t } = useTranslation()
    const {
        label,
        data = [],
        idKey = '_id',
        valueKey = 'name',
        className,
        name,
        form,
        rules,
        tracking,
        onReload,
        addMore,
        loading,
        disabled,
        onChange,
        showImage,
        disabledClear,
        surplusName = t(LANGUAGE.SURPLUS),
        disabledShowSurplus,
        multiple = false,
        EmptyOptionFallback,
    } = props
    const value = useMemo(() => {
        return form.getValues(name)
    }, [JSON.stringify(form.getValues(name))])

    const [query, setQuery] = useState(value?.[valueKey] ?? '')
    const [selectedItem, setSelectedItem] = useState(value)
    const [loadingAddMore, setLoadingAddMore] = useState(false)
    const [surplus, setSurplus] = useState(value?.surplus || null)

    useEffect(() => {
        if (isEmpty(data)) {
            return
        }
        setSelectedItem((prev: any) => find(data, [idKey, get(prev, idKey)]) ?? null)
    }, [data])

    useEffect(() => {
        if (!isNil(selectedItem?.surplus)) {
            setSurplus(selectedItem.surplus)
        } else if (!isNil(surplus)) setSurplus(null)
    }, [selectedItem])

    const filterData =
        query === '' ? data : filter(data, (item) => item[valueKey]?.toLowerCase().includes(query.toLowerCase()))

    const handleChange = async (value: any, fieldChange: (...event: any[]) => void) => {
        if (typeof value === 'string') {
            if (addMore) {
                try {
                    setLoadingAddMore(true)
                    // delete spaces between and last first
                    value = value.replace(/\s+/g, ' ').trim()
                    // capitalize first letter
                    value = value.charAt(0).toUpperCase() + value.slice(1)
                    const data = await addMore(value)
                    if (data) {
                        fieldChange(data)
                        onChange?.(data)
                        setSelectedItem(data)
                    } else {
                        console.log('Error add more!')
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoadingAddMore(false)
                }
            } else {
                toast.warn<string>('Could not find "addMore" function in Autocomplete')
            }
        } else {
            setSelectedItem(value)
            onChange?.(value)
            fieldChange(value)
        }
    }

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    <Combobox
                        as='div'
                        ref={ref}
                        value={selectedItem}
                        onChange={(value) => {
                            handleChange(value, field.onChange)
                            tracking?.(name)
                        }}
                        onBlur={() => {
                            field.onBlur()
                            setTimeout(() => {
                                setQuery('')
                            }, 300)
                        }}
                        disabled={disabled || loading}
                        multiple={multiple as any}
                    >
                        <Label label={label} loading={loading} onReload={onReload} />
                        <div className='relative mt-1'>
                            <Input
                                valueKey={valueKey}
                                disabled={disabled}
                                loading={loading}
                                loadingAddMore={loadingAddMore}
                                onChange={setQuery}
                            />
                            <Button
                                disabled={disabled}
                                disabledClear={disabledClear}
                                field={field}
                                loading={loading}
                                onChange={onChange}
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                            />

                            <Options
                                addMore={addMore}
                                filterData={filterData}
                                idKey={idKey}
                                valueKey={valueKey}
                                query={query}
                                showImage={showImage}
                                EmptyOptionFallback={EmptyOptionFallback}
                            />
                        </div>
                    </Combobox>
                    <Surplus disabledShowSurplus={disabledShowSurplus} surplus={surplus} surplusName={surplusName}>
                        <ErrorMessage error={error} />
                    </Surplus>
                </div>
            )}
        />
    )
})

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
