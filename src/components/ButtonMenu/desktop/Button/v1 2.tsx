import clsx from 'clsx'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/components'
import Divider from '~/components/Divider'

const v1: React.FC<MenuButtonProps> = (props) => {
    const { data, link, onClick } = props
    const { title, color, icon: Icon, divider } = data

    return (
        <>
            {divider && <Divider className='w-full py-1' />}
            <Link
                to={link}
                className={clsx(
                    'group inline-flex min-w-[50px] flex-col items-center justify-center space-y-2 rounded-md border border-transparent py-2 px-2 font-medium focus:outline-none dark:bg-slate-800 xl:relative xl:origin-bottom-right xl:transition-all xl:hover:right-full xl:hover:my-2 xl:hover:w-[150px] xl:hover:-translate-x-1/4 xl:hover:scale-125 xl:hover:shadow-lg',
                    color
                )}
                title={title}
                onClick={onClick}
            >
                <Icon className='h-10 w-10 xl:h-8 xl:w-8' />
                <span className='block w-full truncate text-center xl:hidden xl:group-hover:block'>{title}</span>
            </Link>
        </>
    )
}
export default memo(v1)
