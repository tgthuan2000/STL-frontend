import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from '~/components'

interface Props {
    id: string
    userName: string
    email: string
    image: string
    message: string
    isActive: boolean
    url: string
}

const User: React.FC<Props> = (props) => {
    const { id, userName, email, image, message, isActive, url } = props

    return (
        <Link
            key={id}
            to={url}
            className={clsx('flex cursor-pointer flex-col py-3 px-4 hover:bg-gray-200 dark:hover:bg-slate-700', {
                'bg-gray-200 dark:bg-slate-700': isActive,
            })}
        >
            <div className={clsx('flex cursor-pointer items-center gap-2')}>
                <Image src={image} alt={userName} avatar={{ roundFull: true, size: 'custom' }} className='h-8 w-8' />

                <div className='max-w-[250px] flex-1'>
                    <p className='truncate font-medium text-gray-900 dark:text-slate-200'>{userName}</p>
                    <small className='block truncate font-normal text-gray-500'>{email}</small>
                </div>
            </div>
            <p className='mt-2 text-sm line-clamp-3' title={message}>
                {message}
            </p>
        </Link>
    )
}

export default User
