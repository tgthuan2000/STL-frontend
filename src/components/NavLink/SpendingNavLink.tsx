import { CashIcon } from '@heroicons/react/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const SpendingNavLink: React.FC<MobileNavLink> = () => {
    return <CashIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
}

export default SpendingNavLink