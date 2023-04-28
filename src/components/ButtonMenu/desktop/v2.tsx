import clsx from 'clsx'
import React, { memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

const v2: React.FC<ButtonMenuProps> = (props) => {
    const { className, data, small = false } = props

    return (
        <div className={clsx('flex w-full gap-4 overflow-x-auto', small ? '' : '', className)}>
            <ButtonMenuProvider data={data}>{(item) => <ButtonItem mode='v2' data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default memo(v2)
