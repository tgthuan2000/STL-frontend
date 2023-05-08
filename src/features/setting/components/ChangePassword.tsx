import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SettingComponentProps } from '~/@types/setting'
import LANGUAGE from '~/i18n/language/key'

const ChangePassword: React.FC<SettingComponentProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <Link to='change-password' className={className}>
            <LockClosedIcon className='h-6 w-6 flex-shrink-0' />
            <p>{t(LANGUAGE.CHANGE_PASSWORD)}</p>
        </Link>
    )
}
export default ChangePassword
