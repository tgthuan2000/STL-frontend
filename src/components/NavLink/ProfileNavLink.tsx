import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const ProfileNavLink: React.FC<MobileNavLink> = () => {
    return <UserIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
}

export default ProfileNavLink
