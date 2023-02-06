import { UserIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import moment from 'moment'
import { Prose } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { TEMPLATE } from '~/constant/template'
import { getSpacingTime } from '~/services'

export const renderList: (data: any, index: number) => React.ReactNode = (data, index) => (
    <div
        className={clsx(
            'flex flex-col w-full px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer',
            !data.read ? 'bg-gray-200 dark:bg-slate-700' : 'dark:bg-slate-800 bg-gray-100'
        )}
        title='Nhấn để xem chi tiết'
    >
        <div className='flex justify-between gap-3'>
            <h4 className='flex-1 font-normal text-sm lg:text-base truncate text-gray-900 dark:text-slate-100'>
                {data.notify.title}
            </h4>
            <span
                className='flex items-center gap-0.5 flex-shrink-0 text-cyan-400 lg:text-sm text-xs'
                title='Số người đã xem'
            >
                <span>{data.notify.viewers ?? 0}</span>
                <UserIcon className='h-4 w-4' />
            </span>
        </div>
        <Prose
            className={clsx(
                'text-xs mt-1 sm:max-w-[calc(100%-80px)] max-w-[calc(100%-40px)] line-clamp-3 dark:text-slate-100',
                {
                    'italic text-gray-400': !data.notify.description,
                    'text-gray-500': !!data.notify.description,
                }
            )}
        >
            {data.notify.description ?? TEMPLATE.EMPTY_DESCRIPTION}
        </Prose>
        <div className='mt-2 flex justify-between items-center'>
            <div>
                {data.read && (
                    <p className='text-xs text-gray-600 dark:text-orange-400'>
                        Đã xem: <b>{moment(data._updatedAt).format(DATE_FORMAT.TIME_DATE)}</b>
                    </p>
                )}
            </div>
            <p className='italic text-xs text-gray-600 dark:text-slate-100'>{getSpacingTime(data.notify._createdAt)}</p>
        </div>
    </div>
)

export const renderTitle = (data: any) => (
    <h4 className='font-normal lg:font-light lg:text-lg text-base text-gray-900 bg-cyan-200 dark:bg-transparent dark:text-sky-400 p-2'>
        {data}
    </h4>
)

export const groupBy = (id: any) => (data: any) => moment(data.notify._createdAt).format(id)

export const rowClick = (data: any) => `/notify/${data.notify._id}`
