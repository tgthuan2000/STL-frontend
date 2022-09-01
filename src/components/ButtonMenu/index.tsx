import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { memo, Suspense } from 'react'
import { IMenuBtn } from '~/@types/components'
import { SlideOverProvider } from '~/context'
import { useStateAsync } from '~/hook'

const ButtonItem = React.lazy(() => import('./ButtonItem'))

const ButtonMenu: React.FC<{ className?: string; data: Promise<IMenuBtn[]> }> = ({ className, data }) => {
    const [menu] = useStateAsync<IMenuBtn[]>(data, [])

    if (isEmpty(menu)) return <></>

    return (
        <div
            className={clsx(
                'xl:hover:bg-white min-w-[80px] xl:hover:bg-opacity-30 transition-all xl:hover:p-3 xl:rounded-lg xl:hover:shadow-lg min-h-[240px] max-w-lg mx-auto grid grid-cols-2 xl:grid-cols-1 gap-2',
                className
            )}
        >
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

export default memo(ButtonMenu)
