import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { OptionMenuItemProps } from '~/@types/layout'
import { useLogout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const LogoutMenuItem: React.FC<OptionMenuItemProps> = ({ btnClassName, iconClassName }) => {
    const { t } = useTranslation()
    const logout = useLogout()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button type='button' className={btnClassName} onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className={iconClassName} />
            {t(LANGUAGE.LOGOUT)}
        </button>
    )
}

export default LogoutMenuItem
