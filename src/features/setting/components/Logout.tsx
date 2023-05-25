import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import { useLogout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const Logout: React.FC<SettingComponentProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()
    const logout = useLogout()

    return (
        <button type='button' className={className} onClick={logout}>
            <ArrowLeftOnRectangleIcon className='h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8' />
            <p className='text-sm sm:text-base'>{t(LANGUAGE.LOGOUT)}</p>
        </button>
    )
}
export default Logout
