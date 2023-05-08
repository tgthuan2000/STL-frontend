import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { OptionMenuItemProps } from '~/@types/layout'
import LANGUAGE from '~/i18n/language/key'

const SettingMenuItem: React.FC<OptionMenuItemProps> = (props) => {
    const { btnClassName, iconClassName } = props
    const { t } = useTranslation()

    return (
        <Link className={btnClassName} to='/setting'>
            <Cog6ToothIcon className={iconClassName} />
            {t(LANGUAGE.SETTING_MANAGEMENT)}
        </Link>
    )
}

export default SettingMenuItem
