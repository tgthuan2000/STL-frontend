import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { memo } from 'react'
import { IMenuBtn } from '~/@types/components'
import { SlideOverProvider } from '~/context'
import { useStateAsync } from '~/hook'
import { SuspenseAnimate } from '~/components'

const ButtonItem = React.lazy(() => import('./ButtonItem'))

const ButtonMenuMobile: React.FC<{ className?: string; data: Promise<IMenuBtn[]> }> = ({ className, data }) => {
    const [menu] = useStateAsync<IMenuBtn[]>(data, [])

    return (
        <SuspenseAnimate
            fallback={<Fallback length={menu.length} />}
            className={clsx('flex flex-nowrap items-center justify-evenly h-full', className)}
        >
            {!isEmpty(menu) &&
                menu.map((item) => (
                    <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                        <ButtonItem data={item} />
                    </SlideOverProvider>
                ))}
        </SuspenseAnimate>
    )
}

export default memo(ButtonMenuMobile)

const Fallback = ({ length }: { length: number }) => {
    return (
        <>
            {Array.from(Array(length)).map((v, i) => (
                <span
                    key={i}
                    className='w-10 h-10 bg-gray-200 animate-pulse inline-block border border-transparent rounded-md xl:relative'
                />
            ))}
        </>
    )
}
