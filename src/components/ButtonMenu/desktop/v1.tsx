import clsx from 'clsx'
import React, { memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

const v1: React.FC<ButtonMenuProps> = (props) => {
    const { className, data } = props

    return (
        <div
            className={clsx(
                'mx-auto grid min-w-[80px] max-w-lg grid-cols-1 gap-2 rounded-lg transition-all hover:bg-white hover:bg-opacity-30 hover:p-3 hover:shadow-lg dark:hover:bg-slate-800',
                className
            )}
        >
            <ButtonMenuProvider data={data}>{(item) => <ButtonItem data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default memo(v1)
