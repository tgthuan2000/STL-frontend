import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { ThemeIconProps } from '~/@types/components'
import { checkDarkTheme } from '~/utils'

const ThemeIcon: React.FC<ThemeIconProps> = ({ theme: [value], ...props }) => {
    return checkDarkTheme(value) ? <SunIcon {...props} /> : <MoonIcon {...props} />
}

export default ThemeIcon
