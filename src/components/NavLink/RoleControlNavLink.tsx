import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const RoleControlNavLink: React.FC<MobileNavLink> = () => {
    return <LockClosedIcon className='h-7 w-7 flex-shrink-0' aria-hidden='true' />
}

export default RoleControlNavLink
