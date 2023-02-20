import { Listbox } from '@headlessui/react'
import { find, get, isNil } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { SelectionProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import { people } from '~/constant/components'
import Button from './Button'
import Label from './Label'
import Options from './Options'

const Selection: React.FC<SelectionProps> = ({
    label,
    data = people,
    idKey = '_id',
    valueKey = 'name',
    placeholder = 'Placeholder',
    className,
    form,
    rules,
    name,
    disabled,
}) => {
    const value = useMemo(() => form.getValues(name), [JSON.stringify(form.getValues(name))])
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        setSelected((prev: any) => {
            if (isNil(prev)) {
                return
            }

            return find(data, [idKey, get(selected, idKey)])
        })
    }, [data])

    const handleChange = (value: any, onChange: (value: any) => void) => {
        setSelected(value)
        onChange(value)
    }

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <Listbox
                        value={selected}
                        onChange={(value) => handleChange(value, field.onChange)}
                        disabled={disabled}
                    >
                        <Label label={label} />
                        <div className='relative mt-1'>
                            <Button disabled={disabled} field={field} placeholder={placeholder} valueKey={valueKey} />

                            <Options data={data} idKey={idKey} valueKey={valueKey} />
                        </div>
                    </Listbox>
                    <ErrorMessage error={error} />
                </div>
            )}
        />
    )
}

export default Selection
