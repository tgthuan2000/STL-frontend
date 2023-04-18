import { BellAlertIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'
import { useNotify } from '~/context'

const NotifyNavLink: React.FC<MobileNavLink> = () => {
    const { total } = useNotify()
    return (
        <>
            <BellAlertIcon className='h-7 w-7 flex-shrink-0' aria-hidden='true' />
            {total > 0 && (
                <span className='absolute -top-2 -right-2 inline-flex h-4 w-4 select-none items-center justify-center rounded-full bg-radical-red-500 text-xs font-normal text-white'>
                    {total}
                </span>
            )}
        </>
    )
}

export default NotifyNavLink
