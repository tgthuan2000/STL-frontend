import { UserGroupIcon } from '@heroicons/react/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const AccountNavLink: React.FC<MobileNavLink> = () => {
    return <UserGroupIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
}

export default AccountNavLink
