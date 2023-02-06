import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FireIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, IDataListView, TimeFilterPayload } from '~/@types/components'
import { MethodQueryData } from '~/@types/spending'
import { DataListView, TimeFilter } from '~/components'
import { Dropdown } from '~/components/_base'
import { COUNT_PAGINATE } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE, __groupBy } from '~/constant/component'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { TEMPLATE } from '~/constant/template'
import { useConfig } from '~/context'
import { useLocalStorage, useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import useAuth from '~/store/auth'
import { getDefaultMode, getLinkSpending } from '~/utils'
import * as __services from '../services/dataListView'
import { services } from '../services/method'

const MethodDetail = () => {
    const { userProfile } = useAuth()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const { width } = useWindowSize()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()
    const { id } = useParams()
    const dropdownOptions = useMemo(() => services.getDropdownOptions({ onReloadClick: () => handleClickReload() }), [])
    const listGroupOptions = useMemo(() => services.getListGroupOptions(), [])
    const getAll = useMemo(
        () =>
            services.getAll({
                userId: userProfile?._id as string,
                kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
                methodSpendingIds: [id as string],
            }),
        []
    )
    const defaultValues = useMemo(() => services.getDefaultValue({ getAll, searchParams }), [])
    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<MethodQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<MethodQueryData>
    }>(defaultValues)

    const [{ method }, fetchData, deleteCacheData, reload, error] = useQuery<MethodQueryData>(query, params, tags)

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('method')
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
        const length = method?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromMethod: length, __toMethod: length + COUNT_PAGINATE },
            }))
            reload('method')
        }
    }

    const handleClickReload = () => {
        setQuery((prev) => ({ ...prev, params: { ...prev.params, __fromMethod: 0, __toMethod: COUNT_PAGINATE } }))
        onReload()
    }

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
                                    disabled={method.loading}
                                />
                            )}
                            <Dropdown
                                form={form}
                                name='viewMode'
                                data={dropdownOptions}
                                idKey='id'
                                valueKey='name'
                                label={<FireIcon className='h-6' />}
                                disabled={method.loading}
                            />
                        </div>
                    </div>
                    {error ? (
                        <p className='m-5 text-radical-red-500 font-medium'>{TEMPLATE.ERROR}</p>
                    ) : (
                        <div ref={parentRef}>
                            <DataListView
                                mode={form.watch('viewMode')?.id}
                                loading={method.loading}
                                onGetMore={handleScrollGetMore}
                                data={method.data?.data}
                                hasNextPage={Boolean(method.data?.hasNextPage)}
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
export default MethodDetail
