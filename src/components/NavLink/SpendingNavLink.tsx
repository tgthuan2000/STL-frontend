import { BanknotesIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const SpendingNavLink: React.FC<MobileNavLink> = () => {
    return <BanknotesIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
}

export default SpendingNavLink
