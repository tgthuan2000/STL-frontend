import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FireIcon, RefreshIcon, TableIcon, ViewListIcon } from '@heroicons/react/outline'
import { get, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, IDataListView, TimeFilterPayload } from '~/@types/components'
import { RecentQueryData } from '~/@types/spending'
import { DataListView, TimeFilter } from '~/components'
import { Dropdown } from '~/components/_base'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE, __groupBy } from '~/constant/component'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { E_FILTER_DATE, TEMPLATE } from '~/constant/template'
import { useConfig } from '~/context'
import { useLocalStorage, useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE, GET_RECENT_SPENDING_PAGINATE } from '~/schema/query/spending'
import { getDate } from '~/services'
import useAuth from '~/store/auth'
import { getDefaultMode, getLinkSpending } from '~/utils'
import * as __services from '../services/dataListView'

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
                            __startDate: getDate(moment(data).toDate(), 'start'),
                            __endDate: getDate(moment(data).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.DATE_RANGE: {
                        const [startDate, endDate] = data
                        params = {
                            __startDate: getDate(moment(startDate).toDate(), 'start'),
                            __endDate: getDate(moment(endDate).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.MONTH: {
                        params = {
                            __startDate: getDate(moment(data).toDate(), 'start', 'month'),
                            __endDate: getDate(moment(data).toDate(), 'end', 'month'),
                        }
                        break
                    }
                    case E_FILTER_DATE.YEAR: {
                        params = {
                            __startDate: getDate(moment(data).toDate(), 'start', 'year'),
                            __endDate: getDate(moment(data).toDate(), 'end', 'year'),
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
                        __startDate: getDate(date, 'start'),
                        __endDate: getDate(date, 'end'),
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
                        __startDate: getDate(startDate, 'start'),
                        __endDate: getDate(endDate, 'end'),
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
                        __startDate: getDate(month, 'start', 'month'),
                        __endDate: getDate(month, 'end', 'month'),
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
                        __startDate: getDate(year, 'start', 'year'),
                        __endDate: getDate(year, 'end', 'year'),
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

    const [dataListView, setDataListView] = useLocalStorage<IDataListView>(LOCAL_STORAGE_KEY.STL_DATALIST_VIEW)

    const form = useForm({
        defaultValues: {
            viewMode: getDefaultMode<DATA_LIST_MODE>(dropdownOptions, dataListView?.viewMode),
            listGroup: getDefaultMode<DATA_LIST_GROUP>(listGroupOptions, dataListView?.listGroup),
        },
    })

    useEffect(() => {
        const viewMode = form.watch('viewMode')
        setDataListView((prev) => ({ ...prev, viewMode: viewMode.id }))
    }, [JSON.stringify(form.watch('viewMode'))])

    useEffect(() => {
        const listGroup = form.watch('listGroup')
        setDataListView((prev) => ({ ...prev, listGroup: listGroup.id }))
    }, [JSON.stringify(form.watch('listGroup'))])

    const { width } = useWindowSize()

    const tableProps: DataListViewTable = useMemo(
        () => ({
            columns: __services.columns(width),
            subRow: __services.subRow,
        }),
        [width]
    )

    const listProps: DataListViewList = useMemo(
        () => ({
            groupBy: __services.groupBy(__groupBy[form.watch('listGroup')?.id]),
            renderList: __services.renderList,
            renderTitle: __services.renderTitle,
        }),
        [JSON.stringify(form.watch('listGroup'))]
    )

    return (
        <div className='sm:px-6 lg:px-8'>
            <div className='mt-4 flex flex-col'>
                <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                    <div className='flex justify-between items-center flex-col sm:flex-row'>
                        <div className='self-start sm:self-auto'>
                            <TimeFilter onSubmit={handleFilterSubmit} />
                        </div>
                        <div className='flex items-center self-end sm:self-auto'>
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
                            <DataListView
                                mode={form.watch('viewMode')?.id}
                                loading={recent.loading}
                                onGetMore={handleScrollGetMore}
                                data={recent.data?.data}
                                hasNextPage={Boolean(recent.data?.hasNextPage)}
                                onRowClick={(data) => getLinkSpending(get(data, 'kindSpending.key'), get(data, '_id'))}
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
    )
}

export default TransactionRecent
