import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { memo } from 'react'
import { IMenuBtn } from '~/@types/components'
import { SlideOverProvider } from '~/context'
import { useStateAsync } from '~/hook'
import { SuspenseAnimate } from '~/components'

const ButtonItem = React.lazy(() => import('./ButtonItem'))

const ButtonMenu: React.FC<{ className?: string; data: Promise<IMenuBtn[]> }> = ({ className, data }) => {
    const [menu] = useStateAsync<IMenuBtn[]>(data, [])

    if (isEmpty(menu)) return <></>

    return (
        <SuspenseAnimate
            fallback={<Fallback length={menu.length} />}
            className={clsx(
                'xl:hover:bg-white min-w-[80px] xl:hover:bg-opacity-30 transition-all xl:hover:p-3 xl:rounded-lg xl:hover:shadow-lg min-h-[240px] max-w-lg mx-auto grid grid-cols-2 xl:grid-cols-1 gap-2',
                className
            )}
        >
            {menu.map((item) => (
                <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                    <ButtonItem data={item} />
                </SlideOverProvider>
            ))}
        </SuspenseAnimate>
    )
}

export default memo(ButtonMenu)

const Fallback = ({ length }: { length: number }) => {
    return (
        <>
            {Array.from(Array(length)).map((v, i) => (
                <span
                    key={i}
                    className='w-full h-full py-6 bg-gray-200 animate-pulse inline-block border border-transparent rounded-md xl:relative'
                />
            ))}
        </>
    )
}
