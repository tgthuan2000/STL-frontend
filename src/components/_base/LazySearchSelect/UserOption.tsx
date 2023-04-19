import clsx from 'clsx'
import React from 'react'
import { Image } from '~/components'

interface UserOptionProps {
    data: any
    active: boolean
}

const UserOption: React.FC<UserOptionProps> = ({ data, active }) => {
    return (
        <div className='flex items-center gap-2'>
            <Image src={data.image} alt={data.userName} avatar={{ roundFull: true, size: 'small' }} />
            <div className='flex-1'>
                <p
                    className={clsx(
                        'truncate font-medium',
                        active ? 'text-white' : 'text-gray-900 dark:text-slate-200'
                    )}
                >
                    {data.userName}
                </p>
                <small
                    className={clsx(
                        'block truncate font-normal',
                        active ? 'text-white' : 'text-gray-500 dark:text-slate-400'
                    )}
                >
                    {data.email}
                </small>
            </div>
        </div>
    )
}

export default UserOption
