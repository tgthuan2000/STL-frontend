import clsx from 'clsx'
import { useSideBar } from '~/context'
import NavLinkMenu from '../NavLinkMenu'
import UserInfo from '../UserInfo'

const SideBar = () => {
    const { desktop } = useSideBar()

    return (
        <div
            className={clsx(
                'group fixed top-16 bottom-0 left-0 z-10 flex flex-col transition-all duration-200 ease-in-out',
                desktop.open ? 'w-64' : 'w-16 hover:w-64'
            )}
        >
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex min-h-0 flex-1 flex-col border-r bg-white dark:border-slate-700 dark:bg-slate-900'>
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
