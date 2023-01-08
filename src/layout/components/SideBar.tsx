import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { SideBarProps } from '~/@types/layout'
import { navigation } from '~/constant/layout'
import useAuth from '~/store/auth'
import TopBar from './TopBar'
import User from './User'
import { useConfig } from '~/context'

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
    const { userProfile, removeUserProfile } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { hasPermissions } = useConfig()

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as='div' className='relative z-40 md:hidden' onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter='transition-opacity ease-linear duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition-opacity ease-linear duration-300'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
                        </Transition.Child>

                        <div className='fixed inset-0 flex z-40'>
                            <Transition.Child
                                as={Fragment}
                                enter='transition ease-in-out duration-300 transform'
                                enterFrom='-translate-x-full'
                                enterTo='translate-x-0'
                                leave='transition ease-in-out duration-300 transform'
                                leaveFrom='translate-x-0'
                                leaveTo='-translate-x-full'
                            >
                                <Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full bg-gray-800'>
                                    <Transition.Child
                                        as={Fragment}
                                        enter='ease-in-out duration-300'
                                        enterFrom='opacity-0'
                                        enterTo='opacity-100'
                                        leave='ease-in-out duration-300'
                                        leaveFrom='opacity-100'
                                        leaveTo='opacity-0'
                                    >
                                        <div className='absolute top-0 right-0 -mr-12 pt-2'>
                                            <button
                                                type='button'
                                                className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className='sr-only'>Close sidebar</span>
                                                <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                                        {/* <div className='flex-shrink-0 flex items-center px-4'>
                                            <img
                                                className='h-8 w-auto'
                                                src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                                                alt='Workflow'
                                            />
                                        </div> */}
                                        <nav className='mt-5 px-2 space-y-1'>
                                            {navigation.map((item) => {
                                                if (!hasPermissions(item.permissions)) {
                                                    return null
                                                }
                                                return (
                                                    <NavLink
                                                        key={item.name}
                                                        onClick={() => setSidebarOpen(false)}
                                                        to={item.href}
                                                        className={({ isActive }) =>
                                                            clsx(
                                                                isActive
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                            )
                                                        }
                                                    >
                                                        {({ isActive }) => (
                                                            <>
                                                                <item.icon
                                                                    className={clsx(
                                                                        isActive
                                                                            ? 'text-gray-300'
                                                                            : 'text-gray-400 group-hover:text-gray-300',
                                                                        'mr-4 flex-shrink-0 h-6 w-6'
                                                                    )}
                                                                    aria-hidden='true'
                                                                />
                                                                {item.name}
                                                            </>
                                                        )}
                                                    </NavLink>
                                                )
                                            })}
                                        </nav>
                                    </div>
                                    <User
                                        onLogout={removeUserProfile}
                                        onCloseSideBar={() => setSidebarOpen(false)}
                                        userProfile={userProfile}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className='flex-shrink-0 w-14'>{/* Force sidebar to shrink to fit close icon */}</div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className='flex-1 flex flex-col min-h-0 bg-gray-800'>
                        <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
                            {/* <div className='flex items-center flex-shrink-0 px-4'>
                                <img
                                    className='h-8 w-auto'
                                    src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                                    alt='Workflow'
                                />
                            </div> */}
                            <nav className='mt-5 flex-1 px-2 space-y-1'>
                                {navigation.map((item) => {
                                    if (!hasPermissions(item.permissions)) {
                                        return null
                                    }
                                    return (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) =>
                                                clsx(
                                                    isActive
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md select-none'
                                                )
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <item.icon
                                                        className={clsx(
                                                            isActive
                                                                ? 'text-gray-300'
                                                                : 'text-gray-400 group-hover:text-gray-300',
                                                            'mr-3 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden='true'
                                                    />
                                                    {item.name}
                                                </>
                                            )}
                                        </NavLink>
                                    )
                                })}
                            </nav>
                        </div>
                        <User
                            onLogout={removeUserProfile}
                            onCloseSideBar={() => setSidebarOpen(false)}
                            userProfile={userProfile}
                        />
                    </div>
                </div>
                <div className='md:pl-64 flex flex-col flex-1'>
                    {/* --- Top bar --- */}
                    <TopBar onClickSidebar={setSidebarOpen} />

                    <main className='flex-1'>
                        <div className='py-6'>
                            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                                {/* Replace with your content */}
                                <div className='min-h-screen sm:min-h-[calc(100vh-50px)]'>{children}</div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Sidebar
