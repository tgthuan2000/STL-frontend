import { UserIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminNotifyData } from '~/@types/notify'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import Prose from '../../Prose'

export interface Props {
    data: AdminNotifyData
}

const NotifyDetailView: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation()
    const { notify } = data

    return (
        <div className='-mx-4 bg-white p-2 dark:bg-slate-800 sm:rounded-lg sm:p-3 sm:shadow-xl'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col items-start justify-between p-2 sm:flex-row'>
                    <div className='flex flex-col gap-0.5'>
                        <h1 className='text-xl font-normal text-gray-900 dark:text-slate-200 sm:text-2xl'>
                            {notify.title}
                        </h1>
                        <Prose>{notify.description}</Prose>
                    </div>
                    <div className='mt-1 flex items-center gap-1'>
                        {notify._createdAt && (
                            <span className='whitespace-nowrap text-xs font-medium text-gray-500 dark:text-slate-300 sm:text-sm'>
                                {moment(notify._createdAt).format(DATE_FORMAT.TIME_DATE)}
                            </span>
                        )}
                        <span className='font-extrabold text-gray-900 dark:text-slate-200'>·</span>
                        <span
                            className='flex flex-shrink-0 items-center gap-0.5 text-xs text-cyan-400 lg:text-sm'
                            title={t(LANGUAGE.VIEWERS) as string}
                        >
                            {/* <span>{notify.viewers ?? 0}</span> */}
                            <UserIcon className='h-4 w-4' />
                        </span>
                    </div>
                </div>
                {notify.content && (
                    <div className='p-1'>
                        <Prose>{notify.content}</Prose>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotifyDetailView
