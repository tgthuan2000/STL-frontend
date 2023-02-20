import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LANGUAGE from '~/i18n/language/key'

const SeeMore: React.FC<{ seeMore?: boolean; to?: string }> = ({ seeMore, to = '/' }) => {
    const { t } = useTranslation()
    if (!seeMore) return null
    return (
        <div className='border-t border-gray-200 bg-gray-50 px-6 py-2 text-right text-sm font-medium dark:border-slate-700 dark:bg-slate-700'>
            <Link
                to={to}
                className='inline-flex cursor-pointer items-center gap-x-1 text-blue-500 hover:opacity-70 dark:text-blue-600'
            >
                {t(LANGUAGE.SEE_MORE)}
                <ArrowSmallRightIcon className='h-6 w-6' />
            </Link>
        </div>
    )
}

export default SeeMore
