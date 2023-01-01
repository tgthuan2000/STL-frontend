import { useAutoAnimate } from '@formkit/auto-animate/react'
import { get, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ISpendingData, RecentQueryData } from '~/@types/spending'
import { TimeFilter, Table, List } from '~/components'
import { TimeFilterPayload } from '~/components/TimeFilter'
import { COUNT_PAGINATE, DATE_FORMAT, TAGS } from '~/constant'
import { E_FILTER_DATE, TEMPLATE } from '~/constant/template'
import { useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE, GET_RECENT_SPENDING_PAGINATE } from '~/schema/query/spending'
import { getDate } from '~/services'
import useAuth from '~/store/auth'
import { FireIcon, RefreshIcon, TableIcon, ViewListIcon } from '@heroicons/react/outline'
import { Dropdown } from '~/components/_base'
import { useForm } from 'react-hook-form'
import { TableColumn } from '~/components/Table'
import { getLinkSpending } from '~/utils'
import * as __services from '../services/transactionRecent'

export enum DATA_LIST_MODE {
    TABLE = 1,
    LIST = 2,
}

export enum DATA_LIST_GROUP {
    DATE = 1,
    MONTH = 2,
    YEAR = 3,
}

const __groupBy = {
    1: DATE_FORMAT.D_DATE,
    2: DATE_FORMAT.MONTH,
    3: DATE_FORMAT.YEAR,
}

export interface TableProps {
    columns: Array<TableColumn>
}

export interface ListProps {
    groupBy: (data: any) => any
    renderTitle: (data: any) => React.ReactNode
    renderList: (data: any, index: number) => React.ReactNode
}

interface ViewMode {
    table: TableProps
    list: ListProps
}

interface TransactionRecentViewProps {
    mode: DATA_LIST_MODE
    data: ISpendingData[] | undefined
    hasNextPage: boolean
    loading: boolean
    onGetMore: () => void
    onRowClick: (data: ISpendingData) => string
    view: ViewMode
}

export type TransactionRecentDataProps = Omit<TransactionRecentViewProps, 'mode' | 'groupBy'> & {
    groupBy?: DATA_LIST_GROUP
}

export interface TransactionRecentSkeletonProps {
    elNumber?: number
}

const TransactionRecent = () => {
    const { userProfile } = useAuth()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    const getAll = useMemo(() => {
        return {
            query: { recent: GET_RECENT_SPENDING_PAGINATE },
            params: {
                userId: userProfile?._id as string,
                kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
                __fromRecent: 0,
                __toRecent: COUNT_PAGINATE,
            },
            tags: { recent: TAGS.ALTERNATE },
        }
    }, [])

    const defaultValues = useMemo(() => {
        try {
            let query = GET_RECENT_SPENDING_PAGINATE,
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE
                let { type, data } = d
                data = JSON.parse(data)

                switch (Number(type)) {
                    case E_FILTER_DATE.DATE: {
                        params = {
                            startDate: getDate(moment(data).toDate(), 'start'),
                            endDate: getDate(moment(data).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.DATE_RANGE: {
                        const [startDate, endDate] = data
                        params = {
                            startDate: getDate(moment(startDate).toDate(), 'start'),
                            endDate: getDate(moment(endDate).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.MONTH: {
                        params = {
                            startDate: getDate(moment(data).toDate(), 'start', 'month'),
                            endDate: getDate(moment(data).toDate(), 'end', 'month'),
                        }
                        break
                    }
                    case E_FILTER_DATE.YEAR: {
                        params = {
                            startDate: getDate(moment(data).toDate(), 'start', 'year'),
                            endDate: getDate(moment(data).toDate(), 'end', 'year'),
                        }
                        break
                    }
                }
            }
            return {
                ...getAll,
                query: { recent: query },
                params: { ...getAll.params, ...params },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    }, [])

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<RecentQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<RecentQueryData>
    }>(defaultValues)

    const [{ recent }, fetchData, deleteCacheData, reload, error] = useQuery<RecentQueryData>(query, params, tags)

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('recent')
        console.log(res)
        reload()
    }

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        switch (data.id) {
            case E_FILTER_DATE.ALL:
                setQuery(getAll)
                break
            case E_FILTER_DATE.DATE:
                const date = data.data as Date
                setQuery((prev) => ({
                    ...prev,
                    query: { recent: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(date, 'start'),
                        endDate: getDate(date, 'end'),
                    },
                }))
                break
            case E_FILTER_DATE.DATE_RANGE:
                const [startDate, endDate] = data.data as Date[]
                setQuery((prev) => ({
                    ...prev,
                    query: { recent: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(startDate, 'start'),
                        endDate: getDate(endDate, 'end'),
                    },
                }))
                break
            case E_FILTER_DATE.MONTH:
                const month = data.data as Date
                setQuery((prev) => ({
                    ...prev,
                    query: { recent: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(month, 'start', 'month'),
                        endDate: getDate(month, 'end', 'month'),
                    },
                }))
                break
            case E_FILTER_DATE.YEAR:
                const year = data.data as Date
                setQuery((prev) => ({
                    ...prev,
                    query: { recent: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(year, 'start', 'year'),
                        endDate: getDate(year, 'end', 'year'),
                    },
                }))
                break
        }

        onReload()
    }

    const handleScrollGetMore = () => {
        const length = recent?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromRecent: length, __toRecent: length + COUNT_PAGINATE },
            }))
            reload('recent')
        }
    }

    const handleClickReload = () => {
        setQuery((prev) => ({ ...prev, params: { ...prev.params, __fromRecent: 0, __toRecent: COUNT_PAGINATE } }))
        onReload()
    }

    const dropdownOptions = useMemo(
        () => [
            [
                { id: DATA_LIST_MODE.TABLE, name: 'Bảng', icon: TableIcon },
                { id: DATA_LIST_MODE.LIST, name: 'Danh sách', icon: ViewListIcon },
            ],
            [{ id: 0, name: 'Làm mới', icon: RefreshIcon, onClick: handleClickReload }],
        ],
        []
    )

    const listGroupOptions = useMemo(
        () => [
            [
                { id: DATA_LIST_GROUP.DATE, name: 'Ngày' },
                { id: DATA_LIST_GROUP.MONTH, name: 'Tháng' },
                { id: DATA_LIST_GROUP.YEAR, name: 'Năm' },
            ],
        ],
        []
    )

    const form = useForm({ defaultValues: { viewMode: dropdownOptions[0][0], listGroup: listGroupOptions[0][0] } })
    const { width } = useWindowSize()

    const tableProps: TableProps = useMemo(
        () => ({
            columns: __services.columns(width),
            subRow: __services.subRow,
        }),
        [width]
    )

    const listProps: ListProps = useMemo(
        () => ({
            groupBy: __services.groupBy(__groupBy[form.watch('listGroup')?.id]),
            renderList: __services.renderList,
            renderTitle: __services.renderTitle,
        }),
        [JSON.stringify(form.watch('listGroup'))]
    )

    return (
        <>
            <div className='sm:px-6 lg:px-8'>
                <div className='mt-4 flex flex-col'>
                    <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                        <div className='flex justify-between items-center'>
                            <TimeFilter onSubmit={handleFilterSubmit} />

                            <div className='flex items-center'>
                                {form.watch('viewMode') && form.watch('viewMode').id === DATA_LIST_MODE.LIST && (
                                    <Dropdown
                                        form={form}
                                        name='listGroup'
                                        data={listGroupOptions}
                                        idKey='id'
                                        valueKey='name'
                                        label={<ViewListIcon className='h-6' />}
                                        disabled={recent.loading}
                                    />
                                )}
                                <Dropdown
                                    form={form}
                                    name='viewMode'
                                    data={dropdownOptions}
                                    idKey='id'
                                    valueKey='name'
                                    label={<FireIcon className='h-6' />}
                                    disabled={recent.loading}
                                />
                            </div>
                        </div>
                        {error ? (
                            <p className='m-5 text-radical-red-500 font-medium'>{TEMPLATE.ERROR}</p>
                        ) : (
                            <div ref={parentRef}>
                                <View
                                    mode={form.watch('viewMode')?.id}
                                    loading={recent.loading}
                                    onGetMore={handleScrollGetMore}
                                    data={recent.data?.data}
                                    hasNextPage={Boolean(recent.data?.hasNextPage)}
                                    onRowClick={(data) =>
                                        getLinkSpending(get(data, 'kindSpending.key'), get(data, '_id'))
                                    }
                                    view={{
                                        table: tableProps,
                                        list: listProps,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

const View: React.FC<TransactionRecentViewProps> = ({ mode, view: { list, table }, ...props }) => {
    switch (mode) {
        case DATA_LIST_MODE.TABLE:
            return <Table {...table} {...props} />
        case DATA_LIST_MODE.LIST:
            return <List {...list} {...props} />
    }
}

export default TransactionRecent
