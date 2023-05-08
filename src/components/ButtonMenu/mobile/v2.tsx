import clsx from 'clsx'
import React, { Suspense, memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import LoadingText from '~/components/Loading/LoadingText'

const v2: React.FC<ButtonMenuProps> = (props) => {
    const { className, data } = props

    return (
        <div className={clsx('hidden-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto', className)}>
            <Suspense fallback={<LoadingText />}>
                {data.map((item) => (
                    <ButtonItem key={item.title} mobile mode='v2' data={item} />
                ))}
            </Suspense>
        </div>
    )
}

export default memo(v2)
