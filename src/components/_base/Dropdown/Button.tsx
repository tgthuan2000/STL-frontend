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
                'inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:bg-slate-500 dark:bg-slate-700 dark:text-teal-500 lg:px-4 lg:py-2'
            }
        >
            {(showValueOnLabel && field.value[valueKey]) || label}
        </Menu.Button>
    )
}

export default Button
