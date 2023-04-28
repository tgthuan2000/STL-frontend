import clsx from 'clsx'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { MobileButtonProps } from '../../ButtonMenuProvider'

const v2: React.FC<MobileButtonProps> = ({ data, onClick }) => {
    const { title, color, icon: Icon, to } = data

    return (
        <>
            <Link
                to={to}
                onClick={onClick}
                className={clsx(
                    'group inline-flex items-center justify-center rounded-md border border-transparent py-1 px-2 font-medium dark:bg-slate-800',
                    color
                )}
                title={title}
            >
                <Icon className='h-8 w-8 sm:h-10 sm:w-10' />
                <span className='block w-full truncate text-center'>{title}</span>
            </Link>
        </>
    )
}
export default memo(v2)
