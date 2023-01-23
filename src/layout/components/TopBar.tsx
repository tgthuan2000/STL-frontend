import { ChevronDoubleRightIcon, MenuIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Notification } from '~/components'
import { useSideBar } from '~/context'
import { useWindowSize } from '~/hook'
import Logo from './Logo'

const TopBar = () => {
    const { width } = useWindowSize()
    const { mobile, desktop } = useSideBar()
    if (width < 768) {
        return (
            <div className='fixed top-0 left-0 right-0 z-10 md:hidden pl-1 py-1 sm:pl-3 sm:pt-3 bg-gray-700'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-200 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                        onClick={() => mobile.set(true)}
                    >
                        <span className='sr-only'>Open sidebar</span>
                        <MenuIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    <Notification />
                </div>
            </div>
        )
    }

    return (
        <div className='top-0 left-0 right-0 z-30 h-16 fixed md:block hidden bg-white dark:bg-gray-900 shadow'>
            <div className='flex h-full items-center'>
                {/* Notification  */}
                <div
                    className={clsx(
                        'flex-shrink-0 w-64 flex items-center justify-center h-full relative transition-all',
                        desktop.open ? 'bg-gray-800' : 'bg-transparent'
                    )}
                >
                    <Logo />
                    <span
                        onClick={() => desktop.set(!desktop.open)}
                        className={clsx(
                            'absolute right-2 hover:bg-cyan-500 cursor-pointer hover:text-white p-2 dark:text-slate-200 rounded-full transition-all',
                            desktop.open && 'rotate-180',
                            desktop.open ? 'text-slate-200' : 'text-gray-600'
                        )}
                    >
                        <ChevronDoubleRightIcon className='h-6 w-6' />
                    </span>
                </div>
                <div className='flex-1 px-3 flex justify-end'>
                    <Notification />
                </div>
            </div>
        </div>
    )
}

export default TopBar
