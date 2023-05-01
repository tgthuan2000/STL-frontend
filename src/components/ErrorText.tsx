import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    message?: string
    className?: string
}

const ErrorText: React.FC<Props> = (props) => {
    const { message, className } = props
    const { t } = useTranslation()

    return <div className={clsx('text-sm text-radical-red-700', className)}>{message ?? t(LANGUAGE.ERROR)}</div>
}

export default ErrorText
