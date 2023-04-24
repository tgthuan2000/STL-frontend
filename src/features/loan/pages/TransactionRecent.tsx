import { get, isEmpty, isNil, sum } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, TimeFilterPayload } from '~/@types/components'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { RecentQueryData } from '~/@types/spending'
import { AnimateWrap, DataListView, ListViewFilter, Transaction } from '~/components'
import { COUNT_PAGINATE } from '~/constant'
import { __groupBy } from '~/constant/component'
import { useCheck, useConfig } from '~/context'
import { useListViewFilter, useQuery, useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import { getLinkSpending } from '~/utils'
import { useColumns, useRenderList } from '../hook/dataListView'
import { services } from '../services'
import * as __services from '../services/dataListView'

const TransactionRecent = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
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
    const [{ recent, total }, fetchData, deleteCacheData, reload, error] = useQuery<RecentQueryData>(
        query,
        params,
        tags
    )

    const dataTotal = useMemo(() => {
        const data = total.data
        if (!Array.isArray(data) || isNil(data) || isEmpty(data)) return
        const defaultValue = { total: 0, count: 0 }
        const { loan, 'get-loan': getLoan } = data.reduce(
            (result, value) => {
                return {
                    ...result,
                    [value.key]: {
                        total: sum(value.data),
                        count: value.data.length,
                    },
                }
            },
            { loan: defaultValue, 'get-loan': defaultValue }
        )

        return {
            cost: loan.total,
            receive: getLoan.total,
            count: [loan, getLoan].reduce((result, value) => result + value.count, 0),
        }
    }, [total.data, t])

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

    const _ = useListViewFilter(handleClickReload)
    const { listGroup, viewMode } = _

    const columns = useColumns()
    const renderList = useRenderList()

    const tableProps: DataListViewTable = useMemo(() => ({ columns, subRow: __services.subRow }), [columns])

    const listProps: DataListViewList = useMemo(
        () => ({
            groupBy: __services.groupBy(__groupBy[listGroup?.id]),
            renderList,
            renderTitle: __services.renderTitle,
        }),
        [JSON.stringify(listGroup), renderList]
    )

    return (
        <Transaction title={t(LANGUAGE.TRANSACTION)}>
            <div className='sm:px-6 lg:px-8'>
                <div className='mt-4 flex flex-col'>
                    <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                        <ListViewFilter
                            _={_}
                            totalData={dataTotal}
                            totalLoading={total.loading}
                            loading={recent.loading}
                            onSubmitTimeFilter={handleFilterSubmit}
                            receiveTitle={t(LANGUAGE.LOAN)}
                            costTitle={t(LANGUAGE.GET_LOAN)}
                        />

                        {error ? (
                            <p className='m-5 font-medium text-radical-red-500'>{t(LANGUAGE.ERROR)}</p>
                        ) : (
                            <AnimateWrap>
                                <DataListView
                                    mode={viewMode?.id}
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
                            </AnimateWrap>
                        )}
                    </div>
                </div>
            </div>
        </Transaction>
    )
}
export default TransactionRecent
