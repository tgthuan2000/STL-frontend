import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const MemberDetail = () => {
    const { t } = useTranslation()
    return <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.COMING_SOON)}</div>
}

export default MemberDetail
