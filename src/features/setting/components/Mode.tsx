import React from 'react'
import { SettingComponentProps } from '~/@types/setting'
import { ThemeIcon } from '~/components'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import { checkDarkTheme } from '~/utils'

const Mode: React.FC<SettingComponentProps> = (props) => {
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
            <ThemeIcon theme={theme} className='w-6 h-6 flex-shrink-0' />
            <p>{checkDarkTheme(value) ? 'Chế độ sáng' : 'Chế độ tối'}</p>
        </button>
    )
}

export default Mode
