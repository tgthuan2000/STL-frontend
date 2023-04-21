import { useTranslation } from 'react-i18next'
import { NotifyDetail, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const Detail = () => {
    const { t } = useTranslation()
    return (
        <Transaction title={t(LANGUAGE.NOTIFICATION)}>
            <NotifyDetail />
        </Transaction>
    )
}

export default Detail
