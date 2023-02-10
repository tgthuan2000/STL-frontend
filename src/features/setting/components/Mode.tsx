import React from 'react'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import { ThemeIcon } from '~/components'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { checkDarkTheme } from '~/utils'

const Mode: React.FC<SettingComponentProps> = (props) => {
    const { t } = useTranslation()
    const theme = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)
    const [value, set] = theme
    return (
        <button
            type='button'
            {...props}
            onClick={() => {
                if (checkDarkTheme(value)) {
                    document.documentElement.classList.remove('dark')
                    set('light')
                } else {
                    document.documentElement.classList.add('dark')
                    set('dark')
                }
            }}
        >
            <ThemeIcon theme={value} className='w-6 h-6 flex-shrink-0' />
            <p>{checkDarkTheme(value) ? t(LANGUAGE.LIGHT_MODE) : t(LANGUAGE.DARK_MODE)}</p>
        </button>
    )
}

export default Mode
