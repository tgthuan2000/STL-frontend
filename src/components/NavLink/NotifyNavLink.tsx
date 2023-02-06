import { BellIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'
import { useNotify } from '~/context'

const NotifyNavLink: React.FC<MobileNavLink> = () => {
    const { total } = useNotify()
    return (
        <>
            <BellIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
            {total > 0 && (
                <span className='absolute select-none -top-2 -right-2 bg-radical-red-500 text-white rounded-full font-normal h-4 w-4 inline-flex justify-center items-center text-xs'>
                    {total}
                </span>
            )}
        </>
    )
}

export default NotifyNavLink
