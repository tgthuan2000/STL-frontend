import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const EmptyTableNotify = () => {
    const { t } = useTranslation()
    return (
        <tr>
            <td colSpan={5} className='whitespace-nowrap py-4 px-2'>
                <span className='block truncate w-full text-center text-md text-gray-700 dark:text-slate-200 font-base'>
                    {t(LANGUAGE.EMPTY_DATA)}
                </span>
            </td>
        </tr>
    )
}

export default EmptyTableNotify
