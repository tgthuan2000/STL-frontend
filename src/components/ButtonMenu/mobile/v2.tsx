import clsx from 'clsx'
import React, { memo } from 'react'
import { IMenuBtn } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import ButtonMenuProvider from '../ButtonMenuProvider'

interface Props {
    className?: string
    data: IMenuBtn[]
}

const v2: React.FC<Props> = (props) => {
    const { className, data } = props

    return (
        <div className={clsx('hidden-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto', className)}>
            <ButtonMenuProvider data={data}>{(item) => <ButtonItem mobile mode='v2' data={item} />}</ButtonMenuProvider>
        </div>
    )
}

export default memo(v2)
