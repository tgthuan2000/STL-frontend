import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { TableColumn } from '~/components/Table'
import { DATE_FORMAT } from '~/constant'
import { TEMPLATE } from '~/constant/template'
import parse from 'html-react-parser'

const getDate = (date: string, width: number) => {
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

export const columns: (width: number) => Array<TableColumn> = (width) => [
    {
        key: 'title',
        title: 'Nội dung',
        label: 'string',
        colSpan: 2,
        renderRow: ({ title, description }: { title: string; description: string }) => (
            <td className='whitespace-nowrap pt-3 pl-2 pr-3 sm:pl-3 sm:text-sm text-xs' colSpan={2}>
                <p className='font-medium'>{title}</p>
                {description ? (
                    <span
                        className={clsx('prose text-xs mt-1 line-clamp-3', {
                            'italic text-gray-400': !description,
                            'text-gray-500': !!description,
                        })}
                    >
                        {parse(description)}
                    </span>
                ) : (
                    <p className='text-gray-400 italic font-normal text-xs mt-1'>{TEMPLATE.EMPTY_DESCRIPTION}</p>
                )}
            </td>
        ),
    },
    {
        key: 'viewers',
        title: 'Lượt xem',
        label: 'string',
        renderRow: ({ viewers }) => (
            <td className='whitespace-nowrap px-1 text-center'>
                <p className='text-xs sm:text-sm font-normal'>{numeral(viewers).format()}</p>
            </td>
        ),
    },
    {
        key: 'created_at',
        title: 'Ngày tạo',
        label: 'string',
        renderRow: ({ _createdAt }) => (
            <td className='px-1 text-center'>
                <p className='whitespace-nowrap text-xs sm:text-sm'>{getDate(_createdAt, width)}</p>
            </td>
        ),
    },
    {
        key: 'updated_at',
        title: 'Cập nhật',
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
            'flex items-center p-2 hover:bg-gray-200 cursor-pointer',
            index % 2 ? 'bg-white' : 'bg-gray-50'
        )}
    >
        <div className='flex flex-1 flex-col'>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-medium text-gray-900 truncate'>{title}</p>
                <p className='sm:text-sm text-xs'>
                    Lượt xem: <b>{numeral(viewers).format()}</b>
                </p>
            </div>
            <div className='flex justify-between'>
                {description ? (
                    <span
                        className={clsx('prose text-xs mt-1 line-clamp-3', {
                            'italic text-gray-400': !description,
                            'text-gray-500': !!description,
                        })}
                    >
                        {parse(description)}
                    </span>
                ) : (
                    <p className='text-gray-400 italic font-normal text-xs mt-1'>{TEMPLATE.EMPTY_DESCRIPTION}</p>
                )}
                <div className='text-right'>
                    <p className='sm:text-sm text-xs'>
                        Ngày tạo: <b>{moment(_createdAt).format(DATE_FORMAT.D_DATE_TIME)}</b>
                    </p>
                    <p className='sm:text-sm text-xs'>
                        Cập nhật: <b>{moment(_updatedAt).format(DATE_FORMAT.D_DATE_TIME)}</b>
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export const renderTitle = (data: any) => (
    <h4 className='font-normal lg:font-light lg:text-lg text-base text-gray-900 bg-cyan-200 p-2'>{data}</h4>
)

export const groupBy = (id: any) => (data: any) => moment(data._updatedAt).format(id)
