import React from 'react'
import { useTranslation } from 'react-i18next'
import { OptionMenuItemProps } from '~/@types/layout'
import { useTheme } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import ThemeIcon from '../ThemeIcon'

const ModeMenuItem: React.FC<OptionMenuItemProps> = (props) => {
    const { btnClassName, iconClassName } = props
    const { t } = useTranslation()
    const { isDarkTheme, theme, toggleTheme } = useTheme()

    return (
        <button type='button' className={btnClassName} onClick={toggleTheme}>
            <ThemeIcon theme={theme} className={iconClassName} />
            {isDarkTheme ? t(LANGUAGE.LIGHT_MODE) : t(LANGUAGE.DARK_MODE)}
        </button>
    )
}

export default ModeMenuItem
