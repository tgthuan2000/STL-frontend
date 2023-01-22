import clsx from 'clsx'
import { Fragment, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { TableProps } from '~/@types/components'

const BodyTable: React.FC<TableProps> = ({
    data,
    columns,
    onGetMore,
    loading,
    SkeletonTable,
    onRowClick,
    hasNextPage,
    subRow,
}) => {
    const navigate = useNavigate()
    const wpLoading = useRef(false)

    const handleGetMoreData = () => {
        if (onGetMore) {
            wpLoading.current = true
            onGetMore()
        }
    }

    useEffect(() => {
        if (!loading && wpLoading.current) {
            wpLoading.current = false
        }
    }, [loading])

    return (
        <>
            {(!loading || wpLoading.current) &&
                data?.map((item, index) => {
                    const to = onRowClick(item)
                    const isEven = index % 2
                    return (
                        <Fragment key={item._id}>
                            <tr
                                onClick={() => navigate(to)}
                                className={clsx('cursor-pointer', { 'bg-gray-50 dark:bg-slate-600': !isEven })}
                            >
                                {columns.map((column, index) => {
                                    return <Fragment key={column.key}>{column.renderRow(item, index)}</Fragment>
                                })}
                            </tr>
                            {subRow && (
                                <tr
                                    className={clsx('cursor-pointer', { 'bg-gray-50 dark:bg-slate-600': !isEven })}
                                    onClick={() => navigate(to)}
                                >
                                    {subRow(item, index, data)}
                                </tr>
                            )}
                        </Fragment>
                    )
                })}
            {loading
                ? SkeletonTable?.(wpLoading.current)
                : hasNextPage && (
                      <tr>
                          <td colSpan={4}>
                              <Waypoint onEnter={handleGetMoreData} bottomOffset='-20%' />
                          </td>
                      </tr>
                  )}
        </>
    )
}

export default BodyTable
