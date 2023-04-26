import { useTranslation } from 'react-i18next'
import { AnimateWrap, Calendar, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import useCalendar from '../hook/useCalendar'

const Dashboard = () => {
    const { t } = useTranslation()

    const { data, loading } = useCalendar()

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.TIME_MANAGEMENT)}>
            <AnimateWrap>
                <Calendar data={data} loading={loading} />
            </AnimateWrap>
        </Transaction>
    )
}

export default Dashboard
