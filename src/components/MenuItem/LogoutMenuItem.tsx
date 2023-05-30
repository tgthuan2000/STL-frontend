import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { OptionMenuItemProps } from '~/@types/layout'
import { useLogout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const LogoutMenuItem: React.FC<OptionMenuItemProps> = (props) => {
    const { btnClassName, iconClassName } = props
    const { t } = useTranslation()
    const logout = useLogout()

    return (
        <button type='button' className={btnClassName} onClick={() => logout()}>
            <ArrowRightOnRectangleIcon className={iconClassName} />
            {t(LANGUAGE.LOGOUT)}
        </button>
    )
}

export default LogoutMenuItem
