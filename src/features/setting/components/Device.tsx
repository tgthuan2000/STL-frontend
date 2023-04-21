import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import LANGUAGE from '~/i18n/language/key'

const Device: React.FC<SettingComponentProps> = (props) => {
    const { t } = useTranslation()
    return (
        <button type='button' {...props} onClick={() => {}}>
            <ComputerDesktopIcon className='h-6 w-6 flex-shrink-0' />
            <p>{t(LANGUAGE.DEVICE_CONTROL)}</p>
        </button>
    )
}

export default Device
