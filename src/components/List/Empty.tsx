import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const EmptyList = () => {
    const { t } = useTranslation()
    return (
        <span className='block truncate w-full text-center text-md text-gray-700 bg-gray-200 dark:bg-slate-700 dark:text-white p-3 sm:rounded-lg font-base'>
            {t(LANGUAGE.EMPTY_DATA)}
        </span>
    )
}

export default EmptyList
