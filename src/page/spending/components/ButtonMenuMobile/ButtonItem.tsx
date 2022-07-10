import clsx from 'clsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/spending'
import { useSlideOver } from '~/context'
import { SlideOver, Divider } from '~/components'
import useAuth from '~/store/auth'

const ButtonItem = ({ data }: MenuButtonProps) => {
    const { title, color, icon: Icon, children, to, query, divider, action } = data

    return (
        <>
            {divider && <Divider className='w-full py-1' />}
            <NavLink
                to={to}
                className={({ isActive }) =>
                    clsx(
                        'group w-14 h-14 text-gray-400 inline-flex items-center justify-center flex-col py-2 px-2 space-y-1 border border-transparent font-medium rounded-md focus:outline-none',
                        isActive && color
                    )
                }
                title={title}
            >
                <Icon className='w-7 h-7' />
            </NavLink>
            <SlideOver>{children}</SlideOver>
        </>
    )
}

export default ButtonItem
