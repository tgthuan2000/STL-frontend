import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SettingComponentProps } from '~/@types/setting'
import LANGUAGE from '~/i18n/language/key'

const Feedback: React.FC<SettingComponentProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <Link to='/feedback' className={className}>
            <ChatBubbleLeftRightIcon className='h-6 w-6 flex-shrink-0' />
            <p>{t(LANGUAGE.FEEDBACK)}</p>
        </Link>
    )
}
export default Feedback
