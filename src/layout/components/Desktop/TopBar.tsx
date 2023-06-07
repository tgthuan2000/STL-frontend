import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { lazy } from 'react'
import { Logo, PermissionCheck } from '~/components'
import { PERMISSION } from '~/constant/permission'
import { useSideBar } from '~/context'

const LanguageSelection = lazy(() => import('~/components/LanguageSelection'))
const Notification = lazy(() => import('~/components/Notification'))

const TopBar = () => {
    const { desktop } = useSideBar()

    return (
        <div className='fixed top-0 left-0 right-0 z-30 h-16 bg-white dark:bg-gray-900'>
            <div className='flex h-full items-center'>
                {/* Notification  */}
                <div
                    className={clsx(
                        'relative flex h-full w-64 flex-shrink-0 items-center justify-center border-b border-r transition-all',
                        desktop.open
                            ? 'border-b-transparent border-r-gray-200 dark:border-r-slate-700'
                            : 'border-r-transparent border-b-gray-200 dark:border-b-slate-700'
                    )}
                >
                    <Logo className='text-4xl' />
                    <span
                        onClick={() => desktop.set(!desktop.open)}
                        className={clsx(
                            'absolute right-2 cursor-pointer rounded-full p-2 text-gray-600 transition-all hover:bg-indigo-500 hover:text-white dark:text-slate-200 dark:hover:bg-cyan-500',
                            desktop.open && 'rotate-180'
                        )}
                    >
                        <ChevronDoubleRightIcon className='h-6 w-6' />
                    </span>
                </div>
                <div className='flex h-full flex-1 justify-end border-b border-b-gray-200 px-3 dark:border-b-slate-700'>
                    <div className='inline-flex items-center gap-2'>
                        <PermissionCheck permissions={[PERMISSION.PROFILE_CHANGE_LANGUAGE]} fallback={<></>}>
                            <LanguageSelection />
                        </PermissionCheck>
                        <PermissionCheck permissions={[PERMISSION.ANNOUNCE_READ]} fallback={<></>}>
                            <Notification />
                        </PermissionCheck>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar
