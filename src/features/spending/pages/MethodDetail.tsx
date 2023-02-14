import { useAutoAnimate } from '@formkit/auto-animate/react'
import { get } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, TimeFilterPayload } from '~/@types/components'
import { MethodQueryData } from '~/@types/spending'
import { DataListView, ListViewFilter } from '~/components'
import { COUNT_PAGINATE } from '~/constant'
import { __groupBy } from '~/constant/component'
import { useConfig } from '~/context'
import { useListViewFilter, useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import LANGUAGE from '~/i18n/language/key'
import useAuth from '~/store/auth'
import { getLinkSpending } from '~/utils'
import * as __services from '../services/dataListView'
import { services } from '../services/method'

const MethodDetail = () => {
    const { t } = useTranslation()
    const { userProfile } = useAuth()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const { width } = useWindowSize()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()
    const { id } = useParams()
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

    const [{ listGroup, viewMode }, _] = useListViewFilter(handleClickReload)

    const tableProps: DataListViewTable = useMemo(
        () => ({
            columns: __services.columns(width),
            subRow: __services.subRow,
        }),
        [width]
    )

    const listProps: DataListViewList = useMemo(
        () => ({
            groupBy: __services.groupBy(__groupBy[listGroup?.id]),
            renderList: __services.renderList,
            renderTitle: __services.renderTitle,
        }),
        [JSON.stringify(listGroup)]
    )

    return (
        <div className='sm:px-6 lg:px-8'>
            <div className='mt-4 flex flex-col'>
                <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                    <ListViewFilter _={_} loading={method.loading} onSubmitTimeFilter={handleFilterSubmit} />
                    {error ? (
                        <p className='m-5 text-radical-red-500 font-medium'>{t(LANGUAGE.ERROR)}</p>
                    ) : (
                        <div ref={parentRef}>
                            <DataListView
                                mode={viewMode?.id}
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
