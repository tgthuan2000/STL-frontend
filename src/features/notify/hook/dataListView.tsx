import { UserIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import moment from 'moment'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Prose } from '~/components'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import { useService } from '~/services'

export const useRenderList = () => {
    const { t } = useTranslation()
    const { getSpacingTime } = useService()

    const callback = useCallback(
        (data: any, index: number) => (
            <div
                className={clsx(
                    'flex w-full cursor-pointer flex-col px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-600',
                    !data.read ? 'bg-white dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-800'
                )}
                title={t(LANGUAGE.CLICK_TO_READ_DETAIL) as string}
            >
                <div className='flex justify-between gap-3'>
                    <h4 className='flex-1 truncate text-sm font-normal text-gray-900 dark:text-slate-100 lg:text-base'>
                        {data.notify.title}
                    </h4>
                    <span
                        className='flex flex-shrink-0 items-center gap-0.5 text-xs text-cyan-400 lg:text-sm'
                        title={t(LANGUAGE.VIEWERS) as string}
                    >
                        <span>{data.notify.viewers ?? 0}</span>
                        <UserIcon className='h-4 w-4' />
                    </span>
                </div>
                <Prose
                    className={clsx(
                        'mt-1 max-w-[calc(100%-40px)] text-xs line-clamp-3 dark:text-slate-100 sm:max-w-[calc(100%-80px)]',
                        {
                            'italic text-gray-400': !data.notify.description,
                            'text-gray-500': !!data.notify.description,
                        }
                    )}
                >
                    {data.notify.description ?? t(LANGUAGE.EMPTY_DESCRIPTION)}
                </Prose>
                <div className='mt-2 flex items-center justify-between'>
                    <div>
                        {data.read && (
                            <p className='text-xs text-cyan-400 dark:text-orange-400'>
                                {t(LANGUAGE.READ)}: <b>{moment(data._updatedAt).format(DATE_FORMAT.TIME_DATE)}</b>
                            </p>
                        )}
                    </div>
                    <p className='text-xs italic text-gray-600 dark:text-slate-100'>
                        {getSpacingTime(data.notify._createdAt)}
                    </p>
                </div>
            </div>
        ),
        [t, getSpacingTime]
    )
    return callback
}
