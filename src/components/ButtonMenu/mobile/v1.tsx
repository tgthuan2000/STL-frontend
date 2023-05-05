import clsx from 'clsx'
import React, { memo } from 'react'
import { IMenuBtn } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

interface Props {
    className?: string
    data: IMenuBtn[]
}

const v1: React.FC<Props> = (props) => {
    const { className, data } = props

    return (
        <div className={clsx('flex h-full flex-nowrap items-center justify-evenly', className)}>
            <ButtonMenuProvider data={data}>{(item) => <ButtonItem mobile data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default memo(v1)
