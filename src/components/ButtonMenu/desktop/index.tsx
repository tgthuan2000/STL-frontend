import clsx from 'clsx'
import React from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItemDesktop from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

const ButtonMenu: React.FC<ButtonMenuProps> = ({ className, data, small = false }) => {
    return (
        <div
            className={clsx(
                'mx-auto grid min-w-[80px] max-w-lg gap-2 transition-all xl:grid-cols-1 xl:rounded-lg xl:hover:bg-white xl:hover:bg-opacity-30 xl:hover:p-3 xl:hover:shadow-lg dark:xl:hover:bg-slate-800',
                small ? 'min-h-[120px] grid-cols-3' : 'min-h-[240px] grid-cols-2',
                className
            )}
        >
            <ButtonMenuProvider data={data}>{(item) => <ButtonItemDesktop data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default ButtonMenu
