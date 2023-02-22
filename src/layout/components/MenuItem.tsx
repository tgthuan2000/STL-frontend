import { Menu } from '@headlessui/react'
import React, { Suspense } from 'react'
import { OptionMenu } from '~/@types/layout'
import MenuItemFallback from './MenuItemFallback'

interface MenuItemProps {
    data: OptionMenu
}

const MenuItem: React.FC<MenuItemProps> = ({ data }) => {
    return (
        <Menu.Item>
            <Suspense fallback={<MenuItemFallback />}>
                <data.component
                    btnClassName='group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500 dark:hover:bg-cyan-500 hover:text-white'
                    iconClassName='mr-2 h-5 w-5'
                />
            </Suspense>
        </Menu.Item>
    )
}

export default MenuItem
