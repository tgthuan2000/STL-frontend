import clsx from 'clsx'
import React, { memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'

const v2: React.FC<ButtonMenuProps> = (props) => {
    const { className, data } = props

    return (
        <div className={clsx('hidden-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto', className)}>
            {data.map((item) => (
                <ButtonItem key={item.title} mobile mode='v2' data={item} />
            ))}
        </div>
    )
}

export default memo(v2)
