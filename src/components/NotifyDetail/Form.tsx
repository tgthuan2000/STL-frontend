import { UserIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React from 'react'
import { NotifyDetailFormProps } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import Prose from '../Prose'

const NotifyDetailForm: React.FC<NotifyDetailFormProps> = ({ data }) => {
    const { notify } = data
    const createdAt = notify._createdAt || notify.notify._createdAt
    return (
        <div className='bg-white dark:bg-slate-800 sm:shadow-xl sm:p-3 sm:rounded-lg p-2 -mx-4'>
            <div className='flex flex-col gap-2'>
                <div className='p-2 flex justify-between items-start'>
                    <div className='flex flex-col'>
                        <h1 className='text-xl text-gray-900 dark:text-slate-200 sm:text-2xl font-normal'>
                            {notify.notify.title}
                        </h1>
                        {createdAt && (
                            <span className='text-gray-500 font-medium text-xs'>
                                {moment(createdAt).format(DATE_FORMAT.TIME_DATE)}
                            </span>
                        )}
                    </div>
                    <div>
                        <span
                            className='flex items-center gap-0.5 flex-shrink-0 text-cyan-400 lg:text-sm text-xs'
                            title='Số người đã xem'
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

export default NotifyDetailForm
