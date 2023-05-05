import { CalendarIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const TimeNavLink: React.FC<MobileNavLink> = () => {
    return <CalendarIcon className='h-7 w-7 flex-shrink-0' aria-hidden='true' />
}

export default TimeNavLink
