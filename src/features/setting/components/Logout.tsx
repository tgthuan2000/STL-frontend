import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import LANGUAGE from '~/i18n/language/key'
import useAuth from '~/store/auth'

const Logout: React.FC<SettingComponentProps> = (props) => {
    const { t } = useTranslation()
    const { removeUserProfile } = useAuth()
    return (
        <button
            type='button'
            onClick={() => {
                removeUserProfile()
            }}
            {...props}
        >
            <ArrowLeftOnRectangleIcon className='w-6 h-6 flex-shrink-0' />
            <p>{t(LANGUAGE.LOGOUT)}</p>
        </button>
    )
}
export default Logout
