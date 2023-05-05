import { useTranslation } from 'react-i18next'
import { AnimateWrap, Calendar, Divider, Transaction } from '~/components'
import { useCheck } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { MobileMenu } from '../components'
import useCalendar from '../hook/useCalendar'

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
            <Divider className='py-6 xl:hidden' dashed />

            <AnimateWrap>
                <Calendar data={data} loading={loading} />
            </AnimateWrap>
        </Transaction>
    )
}

export default Dashboard
