import { Combobox } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LazySearchSelectProps } from '~/@types/components'
import Icon from './Icon'
import Input from './Input'
import Label from './Label'
import Options from './Options'

const LazySearchSelect: React.FC<LazySearchSelectProps> = ({
    name,
    className,
    onChange,
    disabled,
    label,
    options,
    placeholder,
    hasNextPage,
    onGetMore,
    onSearch,
    valueKey = '_id',
    labelKey = 'name',
    loading,
    getOptionLabel,
    autoFocus,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const form = useForm({
        defaultValues: {
            __search: '',
        },
    })

    const handleChange = (value: any) => {
        onChange(value)
        form.setValue('__search', '')
        inputRef.current?.focus()
    }

    const wpLoading = useRef(false)

    const handleGetMoreData = () => {
        if (onGetMore) {
            wpLoading.current = true
            onGetMore()
        }
    }

    useEffect(() => {
        if (!loading && wpLoading.current) {
            wpLoading.current = false
        }
    }, [loading])

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null

        const value = form.watch('__search').trim()
        if (value) {
            timeout = setTimeout(() => {
                try {
                    onSearch?.(value)
                } catch (error) {
                    console.log(error)
                }
            }, 1000)
        }
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [JSON.stringify(form.watch('__search'))])

    const handleSearch = (value: string, onChange: (...event: any[]) => void) => {
        onChange(value)
    }

    return (
        <Controller
            control={form.control}
            name={'__search'}
            render={({ field }) => (
                <div className={className}>
                    <Combobox
                        as='div'
                        value={null}
                        onChange={handleChange}
                        onBlur={() => {
                            field.onBlur()
                            setTimeout(() => {
                                form.setValue('__search', '')
                            }, 300)
                        }}
                        disabled={disabled}
                    >
                        <Label label={label} />
                        <div className='relative mt-1'>
                            <Input
                                ref={inputRef}
                                autoFocus={autoFocus}
                                disabled={disabled}
                                placeholder={placeholder}
                                field={field}
                                handleSearch={handleSearch}
                                loading={loading}
                            />

                            <Icon loading={loading} />

                            <Options
                                getOptionLabel={getOptionLabel}
                                handleGetMoreData={handleGetMoreData}
                                hasNextPage={hasNextPage}
                                labelKey={labelKey}
                                loading={loading}
                                options={options}
                                valueKey={valueKey}
                            />
                        </div>
                    </Combobox>
                </div>
            )}
        />
    )
}

export default LazySearchSelect
