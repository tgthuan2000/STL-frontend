import clsx from 'clsx'
import { useSideBar } from '~/context'
import NavLinkMenu from '../NavLinkMenu'
import UserInfo from '../UserInfo'

const SideBar = () => {
    const { desktop } = useSideBar()

    return (
        <div
            className={clsx(
                'group hidden md:fixed md:top-16 md:bottom-0 md:left-0 md:z-10 md:flex md:w-64 md:flex-col md:transition-all md:duration-300 md:ease-in-out',
                desktop.open ? 'md:w-64' : 'md:w-16 hover:md:w-64'
            )}
        >
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex min-h-0 flex-1 flex-col bg-gray-800'>
                <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden pt-5 pb-4'>
                    <nav className='mt-5 flex-1 space-y-1 px-2'>
                        <NavLinkMenu />
                    </nav>
                </div>
                <UserInfo />
            </div>
        </div>
    )
}

export default SideBar
