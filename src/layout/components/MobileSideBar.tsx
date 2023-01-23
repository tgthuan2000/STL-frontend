import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment, useMemo } from 'react'
import { navigation } from '~/constant/layout'
import { useConfig, useSideBar } from '~/context'
import useAuth from '~/store/auth'
import Logo from './Logo'
import NavLinkItem from './NavLinkItem'
import User from './User'

const MobileSideBar = () => {
    const { hasPermissions } = useConfig()
    const { removeUserProfile, userProfile } = useAuth()
    const _navigation = useMemo(
        () => navigation.filter((nav) => hasPermissions(nav.permissions)),
        [navigation, hasPermissions]
    )
    const { mobile } = useSideBar()

    return (
        <Transition.Root show={mobile.open} as={Fragment}>
            <Dialog as='div' className='relative z-40 md:hidden' onClose={mobile.set}>
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
                                        onClick={() => mobile.set(false)}
                                    >
                                        <span className='sr-only'>Close sidebar</span>
                                        <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                                <Logo />
                                <nav className='mt-5 px-2 space-y-1'>
                                    {_navigation.map((item) => (
                                        <NavLinkItem key={item.href} data={item} onClick={() => mobile.set(false)} />
                                    ))}
                                </nav>
                            </div>
                            <User
                                onLogout={removeUserProfile}
                                onCloseSideBar={() => mobile.set(false)}
                                userProfile={userProfile}
                            />
                        </Dialog.Panel>
                    </Transition.Child>
                    <div className='flex-shrink-0 w-14'>{/* Force sidebar to shrink to fit close icon */}</div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MobileSideBar
