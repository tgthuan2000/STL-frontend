import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { useMemo } from 'react'
import { Image } from '~/components'
import { userOptionData } from '~/constant/layout'
import { useConfig, useSideBar } from '~/context'
import useAuth from '~/store/auth'
import MenuItem from './MenuItem'

const UserInfo = () => {
    const { desktop } = useSideBar()
    const { userProfile } = useAuth()
    const { hasPermissions } = useConfig()
    const _userOptionData = useMemo(
        () => userOptionData.map((options) => options.filter((option) => hasPermissions(option.permissions))),
        [userOptionData, hasPermissions]
    )

    return (
        <Menu as='div' className='relative flex bg-gray-700 p-4 cursor-pointer select-none'>
            <Menu.Button className='block max-w-full'>
                <div className='flex items-center justify-center gap-x-3'>
                    <div className='flex-shrink-0'>
                        <Image size='large' src={userProfile?.image} />
                    </div>
                    <div
                        className={clsx(
                            'text-left flex-1 overflow-hidden',
                            !desktop.open && 'group-hover:block hidden'
                        )}
                    >
                        <p className='text-base font-normal text-white truncate'>{userProfile?.userName}</p>
                        <p className='text-sm font-normal text-gray-400 truncate'>{userProfile?.email}</p>
                    </div>
                </div>
            </Menu.Button>

            <Menu.Items className='absolute bottom-full left-1/2 mt-2 select-none whitespace-nowrap origin-top-right divide-y overflow-hidden divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {_userOptionData.map((options, index) => (
                    <div className='px-1 py-1 space-y-0.5' key={index}>
                        {options?.map((option) => (
                            <MenuItem key={option.id} data={option} />
                        ))}
                    </div>
                ))}
            </Menu.Items>
        </Menu>
    )
}

export default UserInfo
