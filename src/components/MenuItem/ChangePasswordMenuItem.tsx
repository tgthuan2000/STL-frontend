import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { OptionMenuItemProps } from '~/@types/layout'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'

const ChangePasswordMenuItem: React.FC<OptionMenuItemProps> = ({ btnClassName, iconClassName }) => {
    const { userProfile } = useProfile()
    const { t } = useTranslation()
    return (
        <Link className={btnClassName} to='/setting/change-password'>
            <LockClosedIcon className={iconClassName} />
            {userProfile?.isHasPassword ? t(LANGUAGE.CHANGE_PASSWORD) : t(LANGUAGE.SET_PASSWORD)}
        </Link>
    )
}

export default ChangePasswordMenuItem
