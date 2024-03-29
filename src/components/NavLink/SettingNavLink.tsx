import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const SpendingNavLink: React.FC<MobileNavLink> = () => {
    return <Cog6ToothIcon className='h-7 w-7 flex-shrink-0' aria-hidden='true' />
}

export default SpendingNavLink
