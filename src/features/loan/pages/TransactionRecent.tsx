import { useAutoAnimate } from '@formkit/auto-animate/react'
import { get } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, TimeFilterPayload } from '~/@types/components'
import { RecentQueryData } from '~/@types/spending'
import { DataListView, ListViewFilter } from '~/components'
import { COUNT_PAGINATE } from '~/constant'
import { __groupBy } from '~/constant/component'
import { useCheck, useConfig } from '~/context'
import { useListViewFilter, useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import LANGUAGE from '~/i18n/language/key'
import useAuth from '~/store/auth'
import { getLinkSpending } from '~/utils'
import { services } from '../services'
import * as __services from '../services/dataListView'

const TransactionRecent = () => {
    const { t } = useTranslation()
    const { userProfile } = useAuth()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const { width } = useWindowSize()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()
    const getAll = useMemo(
        () =>
            services.getAll({
                userId: userProfile?._id as string,
                kindSpendingIds: getKindSpendingIds('GET_LOAN', 'LOAN'),
            }),
        []
    )
    const defaultValues = useMemo(() => services.getDefaultValue({ searchParams, getAll }), [])
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
                    <ListViewFilter _={_} loading={recent.loading} onSubmitTimeFilter={handleFilterSubmit} />

                    {error ? (
                        <p className='m-5 text-radical-red-500 font-medium'>{t(LANGUAGE.ERROR)}</p>
                    ) : (
                        <div ref={parentRef}>
                            <DataListView
                                mode={viewMode?.id}
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
