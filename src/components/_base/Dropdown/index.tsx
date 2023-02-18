import { Menu } from '@headlessui/react'
import { find, flatMapDeep, get, isNil } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { DropdownProps } from '~/@types/components'
import ErrorMessage from '../../ErrorMessage'
import Button from './Button'
import Items from './Items'

const Dropdown: React.FC<DropdownProps> = ({
    label,
    data = [],
    idKey = '_id',
    valueKey = 'name',
    className,
    form,
    rules,
    name,
    disabled,
    showValueOnLabel,
    customButtonClassName,
}) => {
    const value = useMemo(() => form.getValues(name), [JSON.stringify(form.getValues(name))])
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        setSelected((prev: any) => {
            if (isNil(prev)) {
                return
            }

            return find(flatMapDeep(data), [idKey, get(selected, idKey)])
        })
    }, [data])

    const handleChange = (value: any, onChange: (value: any) => void) => {
        const __change = (v: any) => {
            setSelected(v)
            onChange(v)
        }
        if (value.onClick) {
            value.onClick(value, __change)
            return
        }
        __change(value)
    }

    return (
        <Controller
            control={form.control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <Menu as='div' className='relative z-[2] inline-block'>
                        <Button
                            customButtonClassName={customButtonClassName}
                            disabled={disabled}
                            field={field}
                            label={label}
                            showValueOnLabel={showValueOnLabel}
                            valueKey={valueKey}
                        />

                        <Items
                            data={data}
                            field={field}
                            handleChange={handleChange}
                            idKey={idKey}
                            valueKey={valueKey}
                            selected={selected}
                        />
                    </Menu>
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
}

export default Dropdown
