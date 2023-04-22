import { useTranslation } from 'react-i18next'
import { NotifyDetail, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const Detail = () => {
    const { t } = useTranslation()
    return (
        <Transaction title={t(LANGUAGE.NOTIFICATION)}>
            <NotifyDetail.Client>{(data) => <NotifyDetail.View data={data} />}</NotifyDetail.Client>
        </Transaction>
    )
}

export default Detail
