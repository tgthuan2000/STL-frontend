import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const EmptyTableNotify = () => {
    const { t } = useTranslation()
    return (
        <tr>
            <td colSpan={5} className='whitespace-nowrap py-4 px-2'>
                <span className='text-md font-base block w-full truncate text-center text-gray-700 dark:text-slate-200'>
                    {t(LANGUAGE.EMPTY_DATA)}
                </span>
            </td>
        </tr>
    )
}

export default EmptyTableNotify
