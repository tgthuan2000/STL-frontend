import { useTranslation } from 'react-i18next'
import { AnimateWrap, Calendar, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { MobileMenu } from '../components'
import useCalendar from '../hook/useCalendar'
import { useCheck } from '~/context'

const Dashboard = () => {
    const { t } = useTranslation()

    const {
        calendar: { data, loading },
        refetch,
    } = useCalendar()

    useCheck(refetch)

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.TIME_MANAGEMENT)}>
            <MobileMenu />
            <AnimateWrap>
                <Calendar data={data} loading={loading} />
            </AnimateWrap>
        </Transaction>
    )
}

export default Dashboard
