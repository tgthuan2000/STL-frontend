import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { filter, find, get, isNil } from 'lodash'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AutoCompleteProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import Option from './Option'
import Surplus from './Surplus'

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
    (
        {
            label,
            data = [],
            idKey = '_id',
            valueKey = 'name',
            className,
            name,
            form,
            rules,
            onReload,
            addMore,
            loading,
            disabled,
            onChange,
            showImage,
            disabledClear,
            surplusName = i18n.t(LANGUAGE.SURPLUS),
            disabledShowSurplus,
            multiple = false,
        },
        ref
    ) => {
        const value = useMemo(() => {
            return form.getValues(name)
        }, [JSON.stringify(form.getValues(name))])

        const [query, setQuery] = useState(value?.[valueKey] ?? '')
        const [selectedItem, setSelectedItem] = useState(value)
        const [loadingAddMore, setLoadingAddMore] = useState(false)
        const [surplus, setSurplus] = useState(value?.surplus || null)

        useEffect(() => {
            setSelectedItem((prev: any) => {
                if (isNil(prev)) {
                    return
                }
                return find(data, [idKey, get(selectedItem, idKey)])
            })
        }, [data])

        useEffect(() => {
            if (!isNil(selectedItem?.surplus)) {
                setSurplus(selectedItem.surplus)
            } else if (!isNil(surplus)) setSurplus(null)
        }, [selectedItem])

        const filterData =
            query === '' ? data : filter(data, (item) => item[valueKey].toLowerCase().includes(query.toLowerCase()))

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
                            onBlur={() => {
                                field.onBlur()
                                setTimeout(() => {
                                    setQuery('')
                                }, 300)
                            }}
                            value={selectedItem}
                            onChange={(value) => handleChange(value, field.onChange)}
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

                                <Option
                                    addMore={addMore}
                                    filterData={filterData}
                                    idKey={idKey}
                                    valueKey={valueKey}
                                    query={query}
                                    showImage={showImage}
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
    }
)

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
