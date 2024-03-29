import { get, isEmpty, isNil, sum } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'
import { DataListViewList, DataListViewTable, TimeFilterPayload } from '~/@types/components'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { MethodQueryData } from '~/@types/spending'
import { AnimateWrap, DataListView, ListViewFilter, Transaction } from '~/components'
import { COUNT_PAGINATE } from '~/constant'
import { __groupBy } from '~/constant/component'
import { useConfig } from '~/context'
import { useListViewFilter, useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import { getLinkSpending } from '~/utils'
import { useColumns } from '../hook/dataListView'
import * as __services from '../services/dataListView'
import { services } from '../services/method'

const MethodDetail = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
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

    const [{ method, total }, fetchData, deleteCacheData, reload, error] = useQuery<MethodQueryData>(
        query,
        params,
        tags
    )

    const dataTotal = useMemo(() => {
        const data = total.data
        if (!Array.isArray(data) || isNil(data) || isEmpty(data)) return
        const defaultValue = { total: 0, count: 0 }
        const {
            receive,
            cost,
            'transfer-from': transferFrom,
            'transfer-to': transferTo,
        } = data.reduce(
            (result, value) => {
                return {
                    ...result,
                    [value.key]: {
                        total: sum(value.data),
                        count: value.data.length,
                    },
                }
            },
            { cost: defaultValue, receive: defaultValue, 'transfer-from': defaultValue, 'transfer-to': defaultValue }
        )

        return {
            cost: cost.total,
            receive: receive.total,
            count: [cost, receive, transferFrom, transferTo].reduce((result, value) => result + value.count, 0),
        }
    }, [total.data, t])

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

    const _ = useListViewFilter(handleClickReload)
    const { listGroup, viewMode } = _
    const columns = useColumns()

    const tableProps: DataListViewTable = useMemo(
        () => ({
            columns,
            subRow: __services.subRow,
        }),
        [columns]
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
        <Transaction title={t(LANGUAGE.METHOD_SPENDING)}>
            <div className='sm:px-6 lg:px-8'>
                <div className='mt-4 flex flex-col'>
                    <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                        <ListViewFilter
                            _={_}
                            totalData={dataTotal}
                            totalLoading={total.loading}
                            loading={method.loading}
                            onSubmitTimeFilter={handleFilterSubmit}
                        />
                        {error ? (
                            <p className='m-5 font-medium text-radical-red-500'>{t(LANGUAGE.ERROR)}</p>
                        ) : (
                            <AnimateWrap>
                                <DataListView
                                    mode={viewMode?.id}
                                    loading={method.loading}
                                    onGetMore={handleScrollGetMore}
                                    data={method.data?.data}
                                    hasNextPage={Boolean(method.data?.hasNextPage)}
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
export default MethodDetail
