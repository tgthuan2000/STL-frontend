import { Menu } from '@headlessui/react'
import React from 'react'
import { DropdownButtonProps } from '~/@types/components'

const Button: React.FC<DropdownButtonProps> = ({
    field,
    disabled,
    customButtonClassName,
    showValueOnLabel,
    valueKey,
    label,
}) => {
    return (
        <Menu.Button
            disabled={disabled}
            className={
                customButtonClassName ||
                'inline-flex w-full justify-center rounded-md bg-black dark:bg-slate-700 disabled:bg-slate-500 dark:text-teal-500 bg-opacity-20 lg:px-4 px-2 lg:py-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
            }
        >
            {(showValueOnLabel && field.value[valueKey]) || label}
        </Menu.Button>
    )
}

export default Button
