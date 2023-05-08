import React from 'react'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import { ThemeIcon } from '~/components'
import { useTheme } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const Mode: React.FC<SettingComponentProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()
    const { theme, isDarkTheme, toggleTheme } = useTheme()

    return (
        <button type='button' className={className} onClick={toggleTheme}>
            <ThemeIcon theme={theme} className='h-6 w-6 flex-shrink-0' />
            <p>{isDarkTheme ? t(LANGUAGE.LIGHT_MODE) : t(LANGUAGE.DARK_MODE)}</p>
        </button>
    )
}

export default Mode
