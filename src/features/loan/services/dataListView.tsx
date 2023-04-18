import clsx from 'clsx'
import moment from 'moment'

export const subRow: (
    { description, loading }: { description: string; loading: boolean },
    index: number,
    data: any[]
) => JSX.Element = ({ description, loading }, index, data) => (
    <td
        colSpan={4}
        className={clsx(
            { 'border-b border-gray-200 dark:border-slate-700': (data && index !== data.length - 1) || loading },
            'whitespace-nowrap px-2 pb-3 text-xs sm:pl-3 sm:text-sm'
        )}
    >
        {description && (
            <div
                title={description}
                className='mt-2 max-w-[450px] cursor-default sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px]'
            >
                {description.split('\n').map((line, index) => (
                    <span key={index} className='block truncate'>
                        {line}
                    </span>
                ))}
            </div>
        )}
    </td>
)

export const renderTitle = (data: any) => (
    <h4 className='bg-cyan-200 p-2 text-base font-normal text-gray-900 dark:bg-slate-800 dark:text-sky-400 lg:text-lg lg:font-light'>
        {data}
    </h4>
)

export const groupBy = (id: any) => (data: any) => moment(data.date).format(id)
