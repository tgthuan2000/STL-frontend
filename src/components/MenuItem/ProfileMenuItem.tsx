import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { OptionMenuItemProps } from '~/@types/layout'
import LANGUAGE from '~/i18n/language/key'

const ProfileMenuItem: React.FC<OptionMenuItemProps> = (props) => {
    const { btnClassName, iconClassName } = props
    const { t } = useTranslation()

    return (
        <Link className={btnClassName} to='/profile'>
            <UserIcon className={iconClassName} />
            {t(LANGUAGE.PROFILE_MANAGEMENT)}
        </Link>
    )
}

export default ProfileMenuItem
