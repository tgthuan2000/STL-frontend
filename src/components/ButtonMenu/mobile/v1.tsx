import clsx from 'clsx'
import React, { memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'

const v1: React.FC<ButtonMenuProps> = (props) => {
    const { className, data } = props

    return (
        <div className={clsx('flex h-full flex-nowrap items-center justify-evenly', className)}>
            {data.map((item) => (
                <ButtonItem key={item.title} mobile data={item} />
            ))}
        </div>
    )
}

export default memo(v1)
