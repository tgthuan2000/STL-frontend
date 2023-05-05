import clsx from 'clsx'
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { MobileButtonProps } from '../../ButtonMenuProvider'

const v1: React.FC<MobileButtonProps> = (props) => {
    const { data, onClick } = props
    const { title, color, icon: Icon, divider, to } = data

    return (
        <>
            {divider && <div className='pointer-events-none h-2/3 w-px select-none bg-gray-300' />}
            <NavLink
                to={to ?? '/'}
                end
                onClick={onClick}
                className={({ isActive }) =>
                    clsx(
                        'group inline-flex h-14 w-14 flex-col items-center justify-center space-y-1 rounded-md border border-transparent py-2 px-2 font-medium text-gray-400 focus:outline-none',
                        isActive && color
                    )
                }
                title={title}
            >
                {({ isActive }) => <Icon className={clsx('transition-all', isActive ? 'h-9 w-9' : 'h-7 w-7')} />}
            </NavLink>
        </>
    )
}

export default memo(v1)
