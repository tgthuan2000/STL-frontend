import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { useMemo, useRef } from 'react'
import { getLinkSpending } from '~/utils'
import BodyTable from './Body'
import EmptyTableTemplate from './Empty'
import SkeletonTableTemplate from './Skeleton'

export interface TableColumn {
    key: string
    title: string
    label: string
    renderRow: (item: any, index: number) => React.ReactNode
    sort?: boolean
    className?: string
}

export interface TableProps {
    columns: Array<TableColumn>
    data: Array<any> | undefined
    loading: boolean
    EmptyTable?: React.ReactNode
    SkeletonTable?: (loading: boolean) => React.ReactNode
    onGetMore?: () => void
    onRowClick: (data: any) => string
    hasNextPage: boolean
    subRow?: (data: any, index: number, origin: any[]) => React.ReactNode
}

const Table: React.FC<TableProps> = ({ columns, loading, data, EmptyTable, ...props }) => {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const { current: __columns } = useRef(columns)
    const Columns = useMemo(() => {
        return __columns.map((column) => {
            return (
                <th
                    key={column.key}
                    scope='col'
                    className={clsx(
                        'text-center whitespace-nowrap border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter',
                        column.className
                    )}
                >
                    {column.title}
                </th>
            )
        })
    }, [])

    return (
        <div className='inline-block w-full py-2 align-middle'>
            <div className='shadow-sm ring-1 ring-black ring-opacity-5 sm:rounded-lg overflow-hidden'>
                <table className='table-fixed w-full overflow-hidden border-separate' style={{ borderSpacing: 0 }}>
                    <thead className='bg-gray-50 select-none'>
                        <tr>{Columns}</tr>
                    </thead>
                    <tbody ref={parentRef} className='bg-white'>
                        {!loading && (!data || isEmpty(data)) ? (
                            EmptyTable
                        ) : (
                            <BodyTable loading={loading} data={data} columns={__columns} {...props} />
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
