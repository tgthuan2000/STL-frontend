import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const Achievement = () => {
    const { t } = useTranslation()

    return (
        <div className='px-3 text-gray-900 dark:text-slate-200 lg:px-6'>
            <h4 className='pb-2 text-lg font-normal sm:text-xl'>{t(LANGUAGE.LONG_BUDGET_ACHIEVEMENT)}</h4>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6'>{t(LANGUAGE.COMING_SOON)}</div>
        </div>
    )
}

export default Achievement
