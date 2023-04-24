import { useTranslation } from 'react-i18next'
import { Calendar, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const Dashboard = () => {
    const { t } = useTranslation()

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.TIME_MANAGEMENT)}>
            <Calendar />
        </Transaction>
    )
}

export default Dashboard
