import React from 'react'
import { useTranslation } from 'react-i18next'
import { OptionMenuItemProps } from '~/@types/layout'
import { checkDarkTheme } from '~/constant/layout'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import ThemeIcon from '../ThemeIcon'

const ModeMenuItem: React.FC<OptionMenuItemProps> = ({ btnClassName, iconClassName }) => {
    const { t } = useTranslation()
    const [theme, setTheme] = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)

    const handleClick = () => {
        if (checkDarkTheme(theme)) {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        } else {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        }
    }
    return (
        <button type='button' className={btnClassName} onClick={handleClick}>
            <ThemeIcon theme={theme} className={iconClassName} />
            {checkDarkTheme(theme) ? t(LANGUAGE.LIGHT_MODE) : t(LANGUAGE.DARK_MODE)}
        </button>
    )
}

export default ModeMenuItem
