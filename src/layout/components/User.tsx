import { Menu } from '@headlessui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProps } from '~/@types/layout'
import { Image } from '~/components'
import { userOptionData } from '~/constant/layout'

const User: React.FC<UserProps> = ({ userProfile, onLogout, onCloseSideBar }) => {
    const navigate = useNavigate()
    return (
        <Menu as='div' className='relative flex bg-gray-700 p-4 cursor-pointer select-none'>
            <Menu.Button className='block'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <Image src={userProfile?.image} />
                    </div>
                    <div className='ml-3 text-left flex-1 overflow-hidden'>
                        <p className='text-base font-normal text-white'>{userProfile?.userName}</p>
                        <p className='text-sm font-normal text-gray-400 truncate'>{userProfile?.email}</p>
                    </div>
                </div>
            </Menu.Button>

            <Menu.Items className='absolute bottom-full left-1/2 mt-2 select-none whitespace-nowrap origin-top-right divide-y overflow-hidden divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {userOptionData.map((options, index) => {
                    return (
                        <div className='px-1 py-1 space-y-0.5' key={index}>
                            {options?.map((option) => {
                                const Icon = option.icon
                                return (
                                    <Menu.Item key={option.id}>
                                        <button
                                            className='group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500 hover:text-white'
                                            onClick={() => {
                                                option.onClick({
                                                    logout: onLogout,
                                                    data: option,
                                                    navigate,
                                                    closeSidebar: onCloseSideBar,
                                                })
                                            }}
                                        >
                                            {Icon && <Icon className='mr-2 h-5 w-5' aria-hidden='true' />}
                                            {typeof option.label === 'string'
                                                ? option.label
                                                : option.label({ userProfile })}
                                        </button>
                                    </Menu.Item>
                                )
                            })}
                        </div>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}

export default User
