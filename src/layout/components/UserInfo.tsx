import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { useMemo } from 'react'
import { Image } from '~/components'
import { userOptionData } from '~/constant/layout'
import { useConfig, useSideBar } from '~/context'
import { useProfile } from '~/store/auth'
import MenuItem from './MenuItem'

const UserInfo = () => {
    const { desktop } = useSideBar()
    const { userProfile } = useProfile()
    const { hasPermissions } = useConfig()
    const _userOptionData = useMemo(
        () => userOptionData.map((options) => options.filter((option) => hasPermissions(option.permissions))),
        [userOptionData, hasPermissions]
    )

    return (
        <Menu as='div' className='relative flex cursor-pointer select-none bg-gray-700 p-4'>
            <Menu.Button className='block max-w-full'>
                <div className='flex items-center justify-center gap-x-3'>
                    <div className='flex-shrink-0'>
                        <Image avatar={{ roundFull: true, size: 'large' }} src={userProfile?.image as string} />
                    </div>
                    <div
                        className={clsx(
                            'flex-1 overflow-hidden text-left',
                            !desktop.open && 'hidden group-hover:block'
                        )}
                    >
                        <p className='truncate text-base font-normal text-white'>{userProfile?.userName}</p>
                        <p className='truncate text-sm font-normal text-gray-400'>{userProfile?.email}</p>
                    </div>
                </div>
            </Menu.Button>

            <Menu.Items className='absolute bottom-full left-1/2 mt-2 origin-top-right select-none divide-y divide-gray-100 overflow-hidden whitespace-nowrap rounded-md bg-white text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-slate-700 dark:bg-slate-800 dark:text-slate-200'>
                {_userOptionData.map((options, index) => (
                    <div className='space-y-0.5 px-1 py-1' key={index}>
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
