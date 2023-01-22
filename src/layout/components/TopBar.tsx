import { MenuIcon } from '@heroicons/react/outline'
import React from 'react'
import { TopBarProps } from '~/@types/layout'
import { Notification } from '~/components'
import { useWindowSize } from '~/hook'

const TopBar: React.FC<TopBarProps> = ({ onClickSidebar }) => {
    const { width } = useWindowSize()
    if (width < 768)
        return (
            <div className='sticky top-0 z-10 md:hidden pl-1 py-1 sm:pl-3 sm:pt-3 bg-gray-700'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-200 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                        onClick={() => onClickSidebar(true)}
                    >
                        <span className='sr-only'>Open sidebar</span>
                        <MenuIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    <Notification leftSide />
                </div>
            </div>
        )

    return (
        <div className='top-0 z-20 sticky md:block hidden pt-3 pb-2 px-3 bg-white dark:bg-gray-900 dark:border-0 border shadow'>
            <div className='flex'>
                {/* Notification  */}
                <Notification />
            </div>
        </div>
    )
}

export default TopBar
