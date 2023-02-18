import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { googleLogout } from '@react-oauth/google'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { OptionMenuItemProps } from '~/@types/layout'
import LANGUAGE from '~/i18n/language/key'
import { useAuth, useProfile } from '~/store/auth'

const LogoutMenuItem: React.FC<OptionMenuItemProps> = ({ btnClassName, iconClassName }) => {
    const { t } = useTranslation()
    const { removeUserProfile } = useProfile()
    const { removeToken } = useAuth()

    const handleLogout = () => {
        removeToken()
        removeUserProfile()
        googleLogout()
    }

    return (
        <button type='button' className={btnClassName} onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className={iconClassName} />
            {t(LANGUAGE.LOGOUT)}
        </button>
    )
}

export default LogoutMenuItem
