import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    date: string | undefined
    fallback?: React.ReactNode
}

const Date: React.FC<Props> = (props) => {
    const { date, fallback } = props
    const { t } = useTranslation()

    if (!date) {
        return <>{fallback ?? t(LANGUAGE.UNLIMITED_TIME)}</>
    }

    return <>{moment(date).format(DATE_FORMAT.D_DATE_TIME)}</>
}

export default Date
