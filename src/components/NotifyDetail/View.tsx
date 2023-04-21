import { UserIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import Prose from '../Prose'
import { NotifyDetailFormData } from '~/@types/components'

export interface Props {
    data: NotifyDetailFormData
}

const NotifyDetailView: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation()
    const { notify } = data
    const createdAt = notify._createdAt || notify.notify._createdAt

    return (
        <div className='-mx-4 bg-white p-2 dark:bg-slate-800 sm:rounded-lg sm:p-3 sm:shadow-xl'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-start justify-between p-2'>
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-normal text-gray-900 dark:text-slate-200 sm:text-2xl'>
                            {notify.notify.title}
                        </h1>
                        {createdAt && (
                            <span className='text-xs font-medium text-gray-500 dark:text-slate-300'>
                                {moment(createdAt).format(DATE_FORMAT.TIME_DATE)}
                            </span>
                        )}
                    </div>
                    <div>
                        <span
                            className='flex flex-shrink-0 items-center gap-0.5 text-xs text-cyan-400 lg:text-sm'
                            title={t(LANGUAGE.VIEWERS) as string}
                        >
                            <span>{notify.notify.viewers ?? 0}</span>
                            <UserIcon className='h-4 w-4' />
                        </span>
                    </div>
                </div>
                {notify.notify.content && (
                    <div className='p-1'>
                        <Prose>{notify.notify.content}</Prose>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotifyDetailView
