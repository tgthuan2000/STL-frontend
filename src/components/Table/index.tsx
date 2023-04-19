import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { useMemo } from 'react'
import { TableProps } from '~/@types/components'
import { getLinkSpending } from '~/utils'
import BodyTable from './Body'
import EmptyTableTemplate from './Empty'
import SkeletonTableTemplate from './Skeleton'

const Table: React.FC<TableProps> = ({ columns, loading, data, EmptyTable, ...props }) => {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    const Columns = useMemo(() => {
        return columns.map((column) => {
            return (
                <th
                    key={column.key}
                    scope='col'
                    className={clsx(
                        'whitespace-nowrap border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-center text-sm font-normal text-gray-900 backdrop-blur backdrop-filter dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200',
                        column.className
                    )}
                    colSpan={column.colSpan ?? 1}
                >
                    {column.title}
                </th>
            )
        })
    }, [columns])

    return (
        <div className='inline-block w-full py-2 align-middle'>
            <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
                <table className='w-full table-fixed border-separate overflow-hidden' style={{ borderSpacing: 0 }}>
                    <thead className='select-none bg-gray-50 dark:bg-slate-700'>
                        <tr>{Columns}</tr>
                    </thead>
                    <tbody ref={parentRef} className='bg-white dark:bg-slate-700 dark:text-slate-200'>
                        {!loading && (!data || isEmpty(data)) ? (
                            EmptyTable
                        ) : (
                            <BodyTable loading={loading} data={data} columns={columns} {...props} />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Table.defaultProps = {
    EmptyTable: <EmptyTableTemplate />,
    SkeletonTable: (loading) => <SkeletonTableTemplate elNumber={loading ? 2 : 10} />,
    onRowClick: (data) => getLinkSpending(data.kindSpending.key, data._id),
}

export default Table
