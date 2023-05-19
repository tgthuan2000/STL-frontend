import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const Achievement = () => {
    const { t } = useTranslation()

    return (
        <div className='px-3 lg:px-6'>
            <h4 className='pb-2 text-lg font-normal sm:text-xl'>{t(LANGUAGE.LONG_BUDGET_ACHIEVEMENT)}</h4>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>{t(LANGUAGE.COMING_SOON)}</div>
        </div>
    )
}

export default Achievement
