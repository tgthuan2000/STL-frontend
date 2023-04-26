import clsx from 'clsx'
import React, { useId } from 'react'
import Label from '~/components/Label'

interface Props {
    label: string
    id?: string
    value: string
    checked: boolean
    disabled?: boolean
    onChange: () => void
}

const Item: React.FC<Props> = (props) => {
    const { label, id, value, checked, onChange, disabled } = props
    const _id = id ?? useId()

    return (
        <div className='flex items-center gap-1'>
            <input
                id={_id}
                type='radio'
                checked={checked}
                disabled={disabled}
                value={value}
                onChange={onChange}
                className='focus:ring-0 focus:ring-transparent focus:ring-offset-0 dark:text-cyan-500'
            />
            <label
                htmlFor={_id}
                className={clsx(
                    'select-none truncate',
                    disabled
                        ? 'text-gray-600 disabled:cursor-not-allowed dark:text-slate-400'
                        : 'cursor-pointer text-gray-900 hover:opacity-70 dark:text-slate-200'
                )}
            >
                {label}
            </label>
        </div>
    )
}

export default Item
