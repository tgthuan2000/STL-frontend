import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SettingComponentProps } from '~/@types/setting'
import LANGUAGE from '~/i18n/language/key'

const Device: React.FC<SettingComponentProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <Link to='device' className={className}>
            <ComputerDesktopIcon className='h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8' />
            <p className='text-sm sm:text-base'>{t(LANGUAGE.DEVICE_CONTROL)}</p>
        </Link>
    )
}

export default Device
