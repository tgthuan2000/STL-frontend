import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const EmptyList = () => {
    const { t } = useTranslation()
    return (
        <span className='text-md block w-full truncate bg-gray-200 p-3 text-center font-normal text-gray-700 dark:bg-slate-700 dark:text-white sm:rounded-lg'>
            {t(LANGUAGE.EMPTY_DATA)}
        </span>
    )
}

export default EmptyList
