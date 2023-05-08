import clsx from 'clsx'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/components'

const v2: React.FC<MenuButtonProps> = (props) => {
    const { data, link, onClick } = props
    const { title, color, icon: Icon } = data

    return (
        <>
            <Link
                to={link}
                className={clsx(
                    'group inline-flex snap-start items-center justify-center gap-0.5 rounded-md border border-transparent py-2 px-3 font-medium dark:bg-slate-800',
                    color
                )}
                title={title}
                onClick={onClick}
            >
                <Icon className='h-8 w-8 sm:h-10 sm:w-10' />
                <span className='block w-full truncate text-center'>{title}</span>
            </Link>
        </>
    )
}
export default memo(v2)
