import { SwitchVerticalIcon } from '@heroicons/react/outline'
import React from 'react'
import { MobileNavLink } from '~/@types/layout'

const LoanNavLink: React.FC<MobileNavLink> = () => {
    return <SwitchVerticalIcon className='flex-shrink-0 h-7 w-7' aria-hidden='true' />
}

export default LoanNavLink
