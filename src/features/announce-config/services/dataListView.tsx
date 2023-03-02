import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { TableColumn } from '~/@types/components'
import { Notify } from '~/@types/notify'
import { Prose } from '~/components'
import { DATE_FORMAT } from '~/constant'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

const getDate = (date: string | undefined, width: number) => {
    return width <= 900 ? (
        <>
            <span>{moment(date).format(DATE_FORMAT.D_DATE)}</span>
            <br />
            <span>{moment(date).format(DATE_FORMAT.TIME)}</span>
        </>
    ) : (
        <span>{moment(date).format(DATE_FORMAT.D_DATE_TIME)}</span>
    )
}

export const columns: (width: number) => Array<TableColumn<Notify>> = (width) => [
    {
        key: 'title',
        title: t(LANGUAGE.CONTENT),
        label: 'string',
        colSpan: 2,
        renderRow: ({ title, description }: { title: string; description: string }) => (
            <td className='whitespace-nowrap pt-3 pl-2 pr-3 text-xs sm:pl-3 sm:text-sm' colSpan={2}>
                <p className='truncate font-medium'>{title}</p>
                {description ? (
                    <Prose
                        className={clsx('mt-1 text-xs line-clamp-3', {
                            'italic text-gray-400': !description,
                            'text-gray-500': !!description,
                        })}
                    >
                        {description}
                    </Prose>
                ) : (
                    <p className='mt-1 text-xs font-normal italic text-gray-400'>{t(LANGUAGE.EMPTY_DESCRIPTION)}</p>
                )}
            </td>
        ),
    },
    {
        key: 'viewers',
        title: t(LANGUAGE.VIEWERS),
        label: 'string',
        renderRow: ({ viewers }) => (
            <td className='whitespace-nowrap px-1 text-center'>
                <p className='text-xs font-normal sm:text-sm'>{numeral(viewers).format()}</p>
            </td>
        ),
    },
    {
        key: 'created_at',
        title: t(LANGUAGE.CREATE_DATE),
        label: 'string',
        renderRow: ({ _createdAt }) => (
            <td className='px-1 text-center'>
                <p className='whitespace-nowrap text-xs sm:text-sm'>{getDate(_createdAt, width)}</p>
            </td>
        ),
    },
    {
        key: 'updated_at',
        title: t(LANGUAGE.UPDATE),
        label: 'string',
        renderRow: ({ _updatedAt }) => (
            <td className='px-1 text-center'>
                <p className='whitespace-nowrap text-xs sm:text-sm'>{getDate(_updatedAt, width)}</p>
            </td>
        ),
    },
]

export const renderList: (data: any, index: number) => React.ReactNode = (
    { viewers, description, title, _createdAt, _updatedAt },
    index
) => (
    <div
        className={clsx(
            'flex cursor-pointer items-center p-2 hover:bg-gray-200 dark:hover:bg-slate-500',
            index % 2 ? 'bg-white dark:bg-slate-700' : 'bg-gray-50 dark:bg-slate-600'
        )}
    >
        <div className='flex flex-1 flex-col text-gray-900 dark:text-slate-200'>
            <div className='flex items-center justify-between'>
                <p className='truncate text-sm font-medium'>{title}</p>
                <p className='text-xs sm:text-sm'>
                    {t(LANGUAGE.VIEWERS)}: <b>{numeral(viewers).format()}</b>
                </p>
            </div>
            <div className='flex justify-between'>
                {description ? (
                    <Prose className='mt-1 text-xs text-gray-500 line-clamp-3'>{description}</Prose>
                ) : (
                    <p className='mt-1 text-xs font-normal italic text-gray-400 dark:text-slate-400'>
                        {t(LANGUAGE.EMPTY_DESCRIPTION)}
                    </p>
                )}
                <div className='text-right'>
                    <p className='text-xs sm:text-sm'>
                        {t(LANGUAGE.CREATE_DATE)}: <b>{moment(_createdAt).format(DATE_FORMAT.D_DATE_TIME)}</b>
                    </p>
                    <p className='text-xs sm:text-sm'>
                        {t(LANGUAGE.UPDATE)}: <b>{moment(_updatedAt).format(DATE_FORMAT.D_DATE_TIME)}</b>
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export const renderTitle = (data: any) => (
    <h4 className='bg-cyan-200 p-2 text-base font-normal text-gray-900 dark:bg-slate-800 dark:text-sky-400 lg:text-lg lg:font-light'>
        {data}
    </h4>
)

export const groupBy = (id: any) => (data: any) => moment(data._updatedAt).format(id)
