import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SettingComponentProps } from '~/@types/setting'
import LANGUAGE from '~/i18n/language/key'

const ChangePassword: React.FC<SettingComponentProps> = (props) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <button
            type='button'
            {...props}
            onClick={() => {
                navigate('change-password')
            }}
        >
            <LockClosedIcon className='w-6 h-6 flex-shrink-0' />
            <p>{t(LANGUAGE.CHANGE_PASSWORD)}</p>
        </button>
    )
}
export default ChangePassword
