import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { NotifyDetail, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const Detail = () => {
    const { t } = useTranslation()

    return (
        <Transaction title={t(LANGUAGE.NOTIFICATION)}>
            <div className='mb-2 flex justify-end sm:-mx-4'>
                <Link
                    to='edit'
                    className='inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border bg-gray-200 px-4 py-3 font-medium text-gray-700 shadow transition-all hover:bg-gray-700 hover:text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:opacity-50 sm:gap-2'
                >
                    <PencilSquareIcon className='h-4 w-4' /> <span>{t(LANGUAGE.UPDATE)}</span>
                </Link>
            </div>
            <NotifyDetail isAdmin>{(data) => <NotifyDetail.View data={data} />}</NotifyDetail>
        </Transaction>
    )
}

export default Detail
