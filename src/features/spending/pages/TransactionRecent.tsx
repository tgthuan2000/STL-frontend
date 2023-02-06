import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FireIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, IDataListView, TimeFilterPayload } from '~/@types/components'
import { RecentQueryData } from '~/@types/spending'
import { DataListView, TimeFilter } from '~/components'
import { Dropdown } from '~/components/_base'
import { COUNT_PAGINATE } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE, __groupBy } from '~/constant/component'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { TEMPLATE } from '~/constant/template'
import { useCheck, useConfig } from '~/context'
import { useLocalStorage, useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import useAuth from '~/store/auth'
import { getDefaultMode, getLinkSpending } from '~/utils'
import * as __services from '../services/dataListView'
import { services } from '../services/transaction'

const TransactionRecent = () => {
    const { userProfile } = useAuth()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const [dataListView, setDataListView] = useLocalStorage<IDataListView>(LOCAL_STORAGE_KEY.STL_DATALIST_VIEW)
    const dropdownOptions = useMemo(() => services.getDropdownOptions({ onReloadClick: () => handleClickReload() }), [])
    const listGroupOptions = useMemo(() => services.getListGroupOptions(), [])
    const getAll = useMemo(
        () =>
            services.getAll({
                userId: userProfile?._id as string,
                kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            }),
        []
    )

    const defaultValues = useMemo(() => services.getDefaultValue({ getAll, searchParams }), [])

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<RecentQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<RecentQueryData>
    }>(defaultValues)

    const [{ recent }, fetchData, deleteCacheData, reload, error] = useQuery<RecentQueryData>(query, params, tags)

    useCheck(reload)

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('recent')
        console.log(res)
        reload()
    }

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        const _data = services.filterSubmit(data, { defaultValues, getAll })

        if (_data) {
            setQuery(_data)
            onReload()
        }
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
                                    label={<ListBulletIcon className='h-6' />}
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
