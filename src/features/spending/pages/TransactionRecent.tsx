import { useAutoAnimate } from '@formkit/auto-animate/react'
import { get, isEmpty, isNil, sum } from 'lodash'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewList, DataListViewTable, TimeFilterPayload } from '~/@types/components'
import { DataListView, ListViewFilter } from '~/components'
import { __groupBy } from '~/constant/component'
import { useListViewFilter } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import { useColumns } from '../hook/dataListView'
import useTransactionRecent from '../hook/useTransactionRecent'
import * as __services from '../services/dataListView'
import { services } from '../services/transaction'

const TransactionRecent = () => {
    const { t } = useTranslation()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    const [{ recent, total }, deleteCacheData, reloadData, error, { defaultValues, getAll, reload, getMore, set }] =
        useTransactionRecent()

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

    const onReload = () => {
        const res = deleteCacheData('recent', 'total')
        console.log(res)
        reloadData()
    }

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        const _data = services.filterSubmit(data, { defaultValues, getAll })

        if (_data) {
            set(_data)
            onReload()
        }
    }

    const handleScrollGetMore = () => {
        const length = recent?.data?.data.length

        if (length) {
            getMore()
            reloadData('recent')
        }
    }

    const handleClickReload = () => {
        reload()
        onReload()
    }

    const _ = useListViewFilter(handleClickReload)
    const { listGroup, viewMode } = _
    const columns = useColumns()

    const tableProps: DataListViewTable = useMemo(() => ({ columns, subRow: __services.subRow }), [columns])

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
                    <ListViewFilter
                        _={_}
                        totalData={dataTotal}
                        totalLoading={total.loading}
                        loading={recent.loading}
                        onSubmitTimeFilter={handleFilterSubmit}
                    />
                    {error ? (
                        <p className='m-5 font-medium text-radical-red-500'>{t(LANGUAGE.ERROR)}</p>
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
