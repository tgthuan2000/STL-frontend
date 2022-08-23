import clsx from 'clsx'
import React from 'react'
import { IMenuBtn } from '~/@types/components'
import { SlideOverProvider } from '~/context'
import ButtonItem from './ButtonItem'

const ButtonMenuMobile: React.FC<{ className?: string; data: IMenuBtn[] }> = ({ className, data }) => {
    return (
        <div className={clsx('flex flex-nowrap items-center justify-evenly h-full', className)}>
            {data.map((item) => (
                <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                    <ButtonItem data={item} />
                </SlideOverProvider>
            ))}
        </div>
    )
}

export default ButtonMenuMobile
