import { useTranslation } from 'react-i18next'
import { NotifyDetail, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const Edit = () => {
    const { t } = useTranslation()

    return (
        <Transaction title={t(LANGUAGE.EDIT_NOTIFY)}>
            <NotifyDetail isAdmin>{(data) => <NotifyDetail.Edit data={data} />}</NotifyDetail>
        </Transaction>
    )
}

export default Edit
