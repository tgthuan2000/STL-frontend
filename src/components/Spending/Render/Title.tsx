import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    title: string | number | undefined
    fallback?: React.ReactNode
}

const Title: React.FC<Props> = (props) => {
    const { title, fallback } = props
    const { t } = useTranslation()

    if (!title) {
        return <>{fallback ?? t(LANGUAGE.EMPTY_METHOD)}</>
    }

    return <>{title}</>
}

export default Title
