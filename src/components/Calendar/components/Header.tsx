import React from 'react'
import { HeaderProps } from 'react-big-calendar'
import { useTranslateLabel } from '../services/events'

const Header: React.ComponentType<HeaderProps> = (props) => {
    const { date, label, localizer } = props
    const translatedLabel = useTranslateLabel(label)

    return <span className='text-sm'>{translatedLabel}</span>
}

export default Header
