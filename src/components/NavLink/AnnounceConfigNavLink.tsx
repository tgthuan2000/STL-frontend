import { TagIcon } from '@heroicons/react/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const AnnounceConfigNavLink: React.FC<MobileNavLink> = () => {
    return <TagIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
}

export default AnnounceConfigNavLink
