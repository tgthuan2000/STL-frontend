import { Combobox } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LazySearchSelectProps } from '~/@types/components'
import Icon from './Icon'
import Input from './Input'
import Label from './Label'
import Options from './Options'

const LazySearchSelect: React.FC<LazySearchSelectProps> = ({
    className,
    onChange,
    disabled,
    label,
    options,
    hasNextPage,
    onGetMore,
    onSearch,
    valueKey = '_id',
    labelKey = 'name',
    loading,
    getOptionLabel,
    autoFocus,
}) => {
    const form = useForm({
        defaultValues: {
            search: '',
        },
    })
    const handleChange = (value: any) => {
        onChange(value)
        form.setValue('search', '')
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

        const value = form.watch('search').trim()
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
    }, [JSON.stringify(form.watch('search'))])

    const handleSearch = (value: string, onChange: (...event: any[]) => void) => {
        onChange(value)
    }

    return (
        <Controller
            control={form.control}
            name='search'
            render={({ field }) => (
                <div className={className}>
                    <Combobox
                        as='div'
                        value={null}
                        onChange={handleChange}
                        onBlur={() => {
                            field.onBlur()
                            setTimeout(() => {
                                form.setValue('search', '')
                            }, 300)
                        }}
                        disabled={disabled}
                    >
                        <Label label={label} />
                        <div className='mt-1 relative'>
                            <Input
                                autoFocus={autoFocus}
                                disabled={disabled}
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
