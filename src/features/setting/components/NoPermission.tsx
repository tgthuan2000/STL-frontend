import { ShieldExclamationIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { SettingComponentProps } from '~/@types/setting'

const NoPermission: React.FC<SettingComponentProps> = (props) => {
    const { className } = props

    return (
        <div className={className}>
            <ShieldExclamationIcon className='h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8' />
        </div>
    )
}

export default NoPermission
