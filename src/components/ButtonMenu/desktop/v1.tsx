import clsx from 'clsx'
import React, { Suspense, memo } from 'react'
import { ButtonMenuProps } from '~/@types/components'
import ButtonItem from '../ButtonItem'
import LoadingText from '~/components/Loading/LoadingText'

const v1: React.FC<ButtonMenuProps> = (props) => {
    const { className, data } = props

    return (
        <div
            className={clsx(
                'mx-auto flex min-w-[80px] max-w-lg flex-col gap-2 rounded-lg transition-all hover:bg-white hover:bg-opacity-30 hover:p-3 hover:shadow-lg dark:hover:bg-slate-800',
                className
            )}
        >
            <Suspense fallback={<LoadingText />}>
                {data.map((item) => (
                    <ButtonItem key={item.title} data={item} />
                ))}
            </Suspense>
        </div>
    )
}

export default memo(v1)
