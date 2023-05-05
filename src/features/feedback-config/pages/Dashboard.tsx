import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { MessageZone, Users } from '../components'

export interface FeedbackState {
    _id: string
    parentId: string | null
}

export const FEEDBACK_PARAM = 'feedback'

const Dashboard = () => {
    const { t } = useTranslation()

    return (
        <Transaction title={t(LANGUAGE.FEEDBACK_MANAGEMENT)} hasBack={false}>
            <div className='mt-10 flex gap-4 sm:mt-5 md:h-[calc(100vh-200px)]'>
                <MessageZone />
                <Users />
            </div>
        </Transaction>
    )
}

export default Dashboard
