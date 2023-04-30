import React from 'react'
import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const Dashboard = () => {
    const { t } = useTranslation()

    return (
        <Transaction title={t(LANGUAGE.FEEDBACK_MANAGEMENT)} hasBack={false}>
            {t(LANGUAGE.COMING_SOON)}
        </Transaction>
    )
}

export default Dashboard
