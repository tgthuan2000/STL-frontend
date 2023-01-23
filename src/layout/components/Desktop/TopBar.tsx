import { ChevronDoubleRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Notification } from '~/components'
import { useSideBar } from '~/context'
import Logo from '../Logo'

const TopBar = () => {
    const { desktop } = useSideBar()
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
