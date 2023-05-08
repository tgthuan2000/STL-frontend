import clsx from 'clsx'
import React, { Suspense, memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import LoadingText from '~/components/Loading/LoadingText'

const v1: React.FC<ButtonMenuProps> = (props) => {
    const { className, data } = props

    return (
        <div className={clsx('flex h-full flex-nowrap items-center justify-evenly', className)}>
            <Suspense fallback={<LoadingText />}>
                {data.map((item) => (
                    <ButtonItem key={item.title} mobile data={item} />
                ))}
            </Suspense>
        </div>
    )
}

export default memo(v1)
