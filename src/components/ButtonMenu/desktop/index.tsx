import clsx from 'clsx'
import React from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItemDesktop from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

const ButtonMenu: React.FC<ButtonMenuProps> = ({ className, data, small = false }) => {
    return (
        <div
            className={clsx(
                'xl:hover:bg-white min-w-[80px] xl:hover:bg-opacity-30 dark:xl:hover:bg-slate-800 transition-all xl:hover:p-3 xl:rounded-lg xl:hover:shadow-lg max-w-lg mx-auto grid xl:grid-cols-1 gap-2',
                small ? 'min-h-[120px] grid-cols-3' : 'min-h-[240px] grid-cols-2',
                className
            )}
        >
            <ButtonMenuProvider data={data}>{(item) => <ButtonItemDesktop data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default ButtonMenu
