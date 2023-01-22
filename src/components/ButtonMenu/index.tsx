import clsx from 'clsx'
import React from 'react'
import { IMenuBtn } from '~/@types/components'
import { SlideOverProvider } from '~/context'
import ButtonItem from './ButtonItem'

const ButtonMenu: React.FC<{ className?: string; data: IMenuBtn[] }> = ({ className, data }) => {
    return (
        <div
            className={clsx(
                'xl:hover:bg-white min-w-[80px] xl:hover:bg-opacity-30 dark:xl:hover:bg-slate-800 transition-all xl:hover:p-3 xl:rounded-lg xl:hover:shadow-lg min-h-[240px] max-w-lg mx-auto grid grid-cols-2 xl:grid-cols-1 gap-2',
                className
            )}
        >
            {data.map((item) => (
                <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                    <ButtonItem data={item} />
                </SlideOverProvider>
            ))}
        </div>
    )
}

export default ButtonMenu
