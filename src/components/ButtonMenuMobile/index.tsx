import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { memo, Suspense } from 'react'
import { IMenuBtn } from '~/@types/components'
import { SlideOverProvider } from '~/context'
import { useStateAsync } from '~/hook'

const ButtonItem = React.lazy(() => import('./ButtonItem'))

const ButtonMenuMobile: React.FC<{ className?: string; data: Promise<IMenuBtn[]> }> = ({ className, data }) => {
    const [menu] = useStateAsync<IMenuBtn[]>(data, [])

    if (isEmpty(menu)) return <></>

    return (
        <div className={clsx('flex flex-nowrap items-center justify-evenly h-full', className)}>
            <Suspense fallback={<div>Loading...</div>}>
                {menu.map((item) => (
                    <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                        <ButtonItem data={item} />
                    </SlideOverProvider>
                ))}
            </Suspense>
        </div>
    )
}

export default memo(ButtonMenuMobile)
