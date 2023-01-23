import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BellIcon, FireIcon, ViewListIcon } from '@heroicons/react/outline'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { DefaultValueResult } from '~/@types/announce-config'
import { DataListViewList, DataListViewTable, IDataListView, TimeFilterPayload } from '~/@types/components'
import { NotifyQueryData } from '~/@types/notify'
import { Button, DataListView, TimeFilter } from '~/components'
import { Dropdown } from '~/components/_base'
import { COUNT_PAGINATE } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE, __groupBy } from '~/constant/component'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { TEMPLATE } from '~/constant/template'
import { useLocalStorage, useQuery, useWindowSize } from '~/hook'
import { getDefaultMode } from '~/utils'
import { EmptyTableNotify, SkeletonTableNotify } from '../components'
import { services } from '../services'
import * as __services from '../services/dataListView'

const Dashboard = () => {
    const [searchParams] = useSearchParams()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const defaultValues = useMemo(() => services.getDefaultValue({ searchParams }), [])
    const dropdownOptions = useMemo(() => services.getDropdownOptions({ onReloadClick: handleClickReload }), [])
    const listGroupOptions = useMemo(() => services.getListGroupOptions(), [])
    const [dataListView, setDataListView] = useLocalStorage<IDataListView>(LOCAL_STORAGE_KEY.STL_DATALIST_VIEW)
    const [{ query, params, tags }, setQuery] = useState<DefaultValueResult>(defaultValues)
    const [{ notify }, fetchData, deleteCacheData, reload, error] = useQuery<NotifyQueryData>(query, params, tags)
    const { width } = useWindowSize()

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('notify')
        console.log(res)
        reload()
    }

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        const _data = services.filterSubmit(data, { defaultValues })

        if (_data) {
            setQuery(_data)
            onReload()
        }
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
                                onRowClick={(data) => `/announce-config/${data._id}`}
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
