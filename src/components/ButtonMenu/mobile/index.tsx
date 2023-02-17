import clsx from 'clsx'
import React from 'react'
import { IMenuBtn } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

const ButtonMenu: React.FC<{ className?: string; data: IMenuBtn[] }> = ({ className, data }) => {
    return (
        <div className={clsx('flex flex-nowrap items-center justify-evenly h-full', className)}>
            <ButtonMenuProvider data={data}>{(item) => <ButtonItem mobile data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default ButtonMenu
