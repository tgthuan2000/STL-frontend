import clsx from 'clsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/components'
import { useSlideOver } from '~/context'
import { SlideOver } from '~/components'
import useAuth from '~/store/auth'
import React from 'react'

const ButtonItem: React.FC<MenuButtonProps> = ({ data }) => {
    const { title, color, icon: Icon, children, to, query, divider, action } = data
    const { setIsOpen, setTitle } = useSlideOver()
    const navigate = useNavigate()
    const { removeUserProfile } = useAuth()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (query || action) {
            action?.(removeUserProfile)
            e.preventDefault()
            navigate(to)
            setIsOpen(true)
            setTitle(title)
        }
    }
    return (
        <>
            {divider && <div className='h-2/3 w-px bg-gray-300 select-none pointer-events-none' />}
            <NavLink
                to={to}
                onClick={handleClick}
                className={({ isActive }) =>
                    clsx(
                        'group w-14 h-14 text-gray-400 inline-flex items-center justify-center flex-col py-2 px-2 space-y-1 border border-transparent font-medium rounded-md focus:outline-none',
                        isActive && color
                    )
                }
                title={title}
            >
                {({ isActive }) => <Icon className={clsx('transition-all', isActive ? 'w-9 h-9' : 'w-7 h-7')} />}
            </NavLink>
            <SlideOver>{children}</SlideOver>
        </>
    )
}

export default ButtonItem
