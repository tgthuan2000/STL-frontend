import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BellIcon, FireIcon, RefreshIcon, TableIcon, ViewListIcon } from '@heroicons/react/outline'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, IDataListView } from '~/@types/components'
import { NotifyQueryData } from '~/@types/notify'
import { Button, DataListView, TimeFilter } from '~/components'
import { TimeFilterPayload } from '~/components/TimeFilter'
import { Dropdown } from '~/components/_base'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE, __groupBy } from '~/constant/component'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { E_FILTER_DATE, TEMPLATE } from '~/constant/template'
import { useLocalStorage, useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { GET_NOTIFY_CONFIG_PAGINATE, GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE } from '~/schema/query/notify'
import { getDate } from '~/services'
import { getDefaultMode } from '~/utils'
import * as __services from '../services/dataListView'

const Dashboard = () => {
    const [searchParams] = useSearchParams()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    const getAll = useMemo(() => {
        return {
            query: { notify: GET_NOTIFY_CONFIG_PAGINATE },
            params: {
                __fromNotify: 0,
                __toNotify: COUNT_PAGINATE,
            },
            tags: { notify: TAGS.ALTERNATE },
        }
    }, [])

    const defaultValues = useMemo(() => {
        try {
            let query = GET_NOTIFY_CONFIG_PAGINATE,
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE
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
                query: { notify: query },
                params: { ...getAll.params, ...params },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    }, [])

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<NotifyQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<NotifyQueryData>
    }>(defaultValues)

    const [{ notify }, fetchData, deleteCacheData, reload, error] = useQuery<NotifyQueryData>(query, params, tags)

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('notify')
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
                    query: { notify: GET_NOTIFY_CONFIG_FILTER_DATE_RANGE_PAGINATE },
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
        const length = notify?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromNotify: length, __toNotify: length + COUNT_PAGINATE },
            }))
            reload('notify')
        }
    }

    const handleClickReload = () => {
        setQuery((prev) => ({ ...prev, params: { ...prev.params, __fromNotify: 0, __toNotify: COUNT_PAGINATE } }))
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
        }),
        [width]
    )

    const listProps: DataListViewList = useMemo(
        () => ({
            groupBy: __services.groupBy(__groupBy[form.watch('listGroup').id]),
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
                                    disabled={notify.loading}
                                />
                            )}
                            <Dropdown
                                form={form}
                                name='viewMode'
                                data={dropdownOptions}
                                idKey='id'
                                valueKey='name'
                                label={<FireIcon className='h-6' />}
                                disabled={notify.loading}
                            />
                            <Link to='create' className='mr-2 sm:mr-0'>
                                <Button type='button' color='green'>
                                    <BellIcon className='h-6' />
                                    Tạo mới
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {error ? (
                        <p className='m-5 text-radical-red-500 font-medium'>{TEMPLATE.ERROR}</p>
                    ) : (
                        <div ref={parentRef}>
                            <DataListView
                                mode={form.watch('viewMode')?.id}
                                loading={notify.loading}
                                onGetMore={handleScrollGetMore}
                                data={notify.data?.data}
                                hasNextPage={Boolean(notify.data?.hasNextPage)}
                                onRowClick={(data) => `/announce-config/${data._id}}`}
                                view={{
                                    table: tableProps,
                                    list: listProps,
                                }}
                                SkeletonTable={(loading) => <SkeletonTableNotify elNumber={loading ? 2 : 10} />}
                                EmptyTable={<EmptyTableNotify />}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard

interface SkeletonTableNotifyProps {
    elNumber: number
}

const SkeletonTableNotify: React.FC<SkeletonTableNotifyProps> = ({ elNumber }) => {
    return (
        <>
            {Array.from(Array(elNumber)).map((item, index, data) => (
                <Fragment key={index}>
                    <tr className='animate-pulse'>
                        <td className='py-4 px-2' colSpan={3}>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block bg-gray-200 h-4 w-1/2 rounded-full' />
                                <span className='block bg-gray-200 h-4 w-3/4 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 sm:w-1/3 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                    </tr>
                </Fragment>
            ))}
        </>
    )
}

const EmptyTableNotify = () => {
    return (
        <tr>
            <td colSpan={6} className='whitespace-nowrap py-4 px-2'>
                <span className='block truncate w-full text-center text-md text-gray-700 font-base'>
                    {TEMPLATE.EMPTY_DATA}
                </span>
            </td>
        </tr>
    )
}
